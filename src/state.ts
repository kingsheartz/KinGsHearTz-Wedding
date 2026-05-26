import { ref } from 'vue'

export const showAdminRSVP = ref(false)
export const showInvitation = ref(false)

export interface RSVPData {
	name: string;
	guests: number;
	attendance: string;
}

export const rsvpData = ref<RSVPData | null>(null)

// Initialize from localStorage if available
try {
	const stored = localStorage.getItem('rsvp_submission')
	if (stored) {
		rsvpData.value = JSON.parse(stored)
	}
} catch (e) {
	console.error('Failed to load RSVP from storage:', e)
}

