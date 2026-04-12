/**
 * KinG's Wedding planner — "Guest list - RSVP" tab (headers in row 5, data from row 6).
 * Columns B–K: First Name | Last Name | Mobile | Email | Invited by | Invitation | Response | Attending | Children | Notes
 * Deploy as Web app (Execute as: Me, Anyone). Set VITE_RSVP_SCRIPT_URL in .env to the /exec URL.
 * Accepts JSON in post body, or form field `payload` (hidden iframe POST from the site).
 */

var SPREADSHEET_ID = '1w6fiIF6pl-4jat2webwi2AWqwXe-mTWdZttp33f2nIs';
var SHEET_NAME = 'Guest list - RSVP';
var DATA_START_ROW = 6;
var COL_FIRST = 2; // B
var COL_LAST = 11; // K
/** B→K width — Sheet.getRange(row, col, numRows, numCols) uses counts, not end coordinates. */
var RSVP_NUM_COLS = COL_LAST - COL_FIRST + 1;

function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

function splitFullName(full) {
  var t = String(full).trim();
  if (!t) return ['', ''];
  var i = t.indexOf(' ');
  if (i < 0) return [t, ''];
  return [t.substring(0, i), t.substring(i + 1).trim()];
}

/** First row ≥ DATA_START_ROW where column B has no visible text (skips spaces). */
function firstEmptyDataRow(sheet) {
  var last = sheet.getLastRow();
  if (last < DATA_START_ROW) {
    return DATA_START_ROW;
  }
  var numRows = last - DATA_START_ROW + 1;
  var colB = sheet.getRange(DATA_START_ROW, COL_FIRST, numRows, 1).getValues();
  for (var i = 0; i < colB.length; i++) {
    if (String(colB[i][0]).trim() === '') {
      return DATA_START_ROW + i;
    }
  }
  return last + 1;
}

function parsePayload(e) {
  if (!e) return null;
  var p = e.parameter || {};
  if (p.name || p.attendance || p.phone) {
    return {
      name: String(p.name || '').trim(),
      phone: String(p.phone || '').trim(),
      email: String(p.email || '').trim(),
      guests: String(p.guests || '').trim(),
      attendance: String(p.attendance || '').trim(),
      message: String(p.message || '').trim(),
    };
  }
  if (p.payload) {
    try {
      return JSON.parse(p.payload);
    } catch (x) {
      return null;
    }
  }
  if (e.postData && e.postData.contents) {
    var raw = String(e.postData.contents).trim();
    try {
      return JSON.parse(raw);
    } catch (x2) {
      return null;
    }
  }
  return null;
}

/**
 * Open your Web App URL in a browser — confirms which spreadsheet + tab the script uses.
 * If the tab name is wrong, fix SHEET_NAME to match the bottom tab exactly.
 */
function doGet() {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sh = ss.getSheetByName(SHEET_NAME);
    var lines = [
      'RSVP script is using:',
      '• File: ' + ss.getName(),
      '• File ID: ' + ss.getId(),
      '• Tab "' + SHEET_NAME + '": ' + (sh ? 'OK' : 'MISSING — rename tab or change SHEET_NAME in the script'),
    ];
    if (sh) {
      lines.push('• Next empty guest row (col B): ' + firstEmptyDataRow(sh));
    }
    return ContentService.createTextOutput(lines.join('\n')).setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput('Error: ' + err).setMimeType(ContentService.MimeType.TEXT);
  }
}

function doPost(e) {
  try {
    Logger.log('RSVP doPost');
    var data = parsePayload(e);
    if (!data) {
      Logger.log('parsePayload returned empty');
      return jsonResponse({ ok: false, error: 'empty' });
    }
    var fullName = String(data.name || '').trim();
    var mobile = String(data.phone || data.mobile || '').trim();
    var email = String(data.email || '').trim();
    var guestsRaw = data.guests != null && data.guests !== '' ? String(data.guests).trim() : '';
    var attendance = String(data.attendance || '').trim();
    var message = String(data.message || '').trim();

    Logger.log('Fields: name=' + fullName + ' phone=' + mobile + ' attendance=' + attendance);

    if (!fullName || !attendance || !mobile) {
      Logger.log('validation failed — missing name, phone, or attendance');
      return jsonResponse({ ok: false, error: 'validation' });
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      Logger.log('Sheet not found: ' + SHEET_NAME);
      return jsonResponse({ ok: false, error: 'missing_sheet' });
    }

    var parts = splitFullName(fullName);
    var firstName = parts[0];
    var lastName = parts[1];

    var happily = attendance.indexOf('Happily') !== -1;
    var response = happily ? 'Yes' : 'No';

    var attendingCount = 0;
    if (happily) {
      var n = parseInt(guestsRaw, 10);
      attendingCount = !isNaN(n) && n >= 1 ? n : 1;
    }

    var tz = Session.getScriptTimeZone();
    var stamp = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm');
    var notes = message ? message + '\n— Website RSVP, ' + stamp : 'Website RSVP, ' + stamp;

    var row = [
      firstName,
      lastName,
      mobile,
      email,
      'Website',
      '',
      response,
      attendingCount,
      '',
      notes,
    ];

    var targetRow = firstEmptyDataRow(sheet);
    sheet.getRange(targetRow, COL_FIRST, 1, RSVP_NUM_COLS).setValues([row]);

    var verify = sheet.getRange(targetRow, COL_FIRST).getValue();
    Logger.log(
      'Wrote RSVP row ' +
        targetRow +
        ' in "' +
        ss.getName() +
        '" / "' +
        sheet.getName() +
        '" — B' +
        targetRow +
        ' = ' +
        verify
    );

    return jsonResponse({
      ok: true,
      row: targetRow,
      file: ss.getName(),
      tab: sheet.getName(),
    });
  } catch (err) {
    Logger.log('doPost error: ' + err);
    return jsonResponse({ ok: false, error: String(err) });
  }
}

/**
 * Do not use setHeader() here — custom headers on Web App TextOutput often make doPost fail
 * (Executions show Failed) while doGet without headers succeeds.
 */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
