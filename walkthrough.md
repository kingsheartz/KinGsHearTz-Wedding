# Hidden RSVP List Implementation

I have successfully added the secret admin view to your wedding website! Here is a breakdown of what was implemented and how to use it:

## 1. Updated Google Apps Script
I created a new file called `RSVP_Script_Updated.js` in your project folder. 
> [!IMPORTANT]
> You need to copy the contents of `RSVP_Script_Updated.js` and paste them into your Google Apps Script editor (replacing your old code). Then, **create a new deployment** for the script so the changes take effect. 
> The secret password configured in the script is `gk2027`. This ensures no one can fetch the list without knowing the secret.

## 2. The Secret Trigger
On your main website page, the sticky header at the top contains a circular logo with the letters **"GK"**. 
To open the admin view, simply **click or tap that logo 5 times quickly**. 

## 3. The Admin Modal (`AdminRSVPList.vue`)
Once triggered, a sleek dark-themed overlay will appear. 
- It securely fetches your guest list directly from your Google Sheet (via the updated Apps Script).
- It displays the guests in an organized table, showing their Name, Mobile Number, Response (Yes/No), Number of Guests, and any special messages they left.
- If you're on a mobile device, the table is fully responsive and scrollable.
- You can close the view anytime by clicking the "Close" button.

## 4. State Management
I introduced a simple global state file (`src/state.ts`) to track when the admin view should be displayed. This keeps your components clean and makes it easy to control the modal from anywhere in the app.

Try it out on your local server by clicking the "GK" logo 5 times! (It will only successfully load data after you update and deploy the Google Apps Script).
