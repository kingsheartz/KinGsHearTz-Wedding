<script setup lang="ts">
import { ref, onMounted } from "vue"
import Home from "./pages/Home.vue"
import SparkleCursor from "./components/SparkleCursor.vue"
import FloatingFlowers from "./components/FloatingFlowers.vue"
import InvitationEnvelope from "./components/InvitationEnvelope.vue"
import InvitationEnvelopeDark from "./components/InvitationEnvelopeDark.vue"
import AdminRSVPList from "./components/AdminRSVPList.vue"
import InvitationTemplate from "./components/InvitationTemplate.vue"
import { showAdminRSVP, showInvitation, rsvpData } from "./state"

const showIntro = ref(true)

// Reactive system dark mode detection (no extra dependencies)
const isDark = ref(window.matchMedia("(prefers-color-scheme: dark)").matches)
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
	isDark.value = e.matches
})

function onEnter() {
	showIntro.value = false
}

onMounted(() => {
	// Parse URL query parameters for direct invitation links
	try {
		const urlParams = new URLSearchParams(window.location.search)
		const name = urlParams.get('name')
		const guests = urlParams.get('guests')
		const attendance = urlParams.get('attendance') || 'Happily attending'

		if (name) {
			rsvpData.value = {
				name: decodeURIComponent(name),
				guests: parseInt(guests || '1', 10),
				attendance: decodeURIComponent(attendance)
			}
			// Bypass intro envelope and show the custom invitation pass
			showIntro.value = false
			showInvitation.value = true
		}
	} catch (e) {
		console.error('Failed to parse URL invitation parameters:', e)
	}
})
</script>

<template>
	<InvitationEnvelopeDark v-if="showIntro && isDark" @enter="onEnter" />
	<InvitationEnvelope v-else-if="showIntro && !isDark" @enter="onEnter" />

	<template v-else>
		<Home />
		<SparkleCursor />
		<FloatingFlowers />
		<AdminRSVPList v-if="showAdminRSVP" />
		<InvitationTemplate />
	</template>
</template>