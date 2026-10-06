/** Wedding day midnight, India Standard Time (countdown target). */
export const WEDDING_DATE = new Date("2027-01-09T00:00:00+05:30")

/** Journey progress bar start (IST). */
export const JOURNEY_START_DATE = new Date("2026-01-01T00:00:00+05:30")

/** Full celebration window on Jan 9, 2027 (IST → UTC for calendar APIs). */
export const CALENDAR_UTC_START = "20270109T023000Z" // 8:00 AM IST
export const CALENDAR_UTC_END = "20270109T153000Z" // 9:00 PM IST

export function formatIcsUtcStamp(date = new Date()): string {
	return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")
}
