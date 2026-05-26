<script setup lang="ts">
import { computed } from 'vue'
import { showInvitation, rsvpData } from '../state'

// Generate personalized invite link
const inviteUrl = computed(() => {
	if (!rsvpData.value) return window.location.origin
	const params = new URLSearchParams()
	params.set('name', rsvpData.value.name)
	params.set('guests', String(rsvpData.value.guests))
	params.set('attendance', rsvpData.value.attendance)
	params.set('rsvp', 'true')
	return `${window.location.origin}?${params.toString()}`
})

// WhatsApp Share URL (share card with others)
const whatsappShareUrl = computed(() => {
	const text = `Hey! I am happily attending Govind & Krishnendu's wedding! Here is my invitation pass: ${inviteUrl.value}`
	return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
})

// WhatsApp Confirmation URL (send details back to the couple)
const couplePhone = '918113990368'
const whatsappConfirmUrl = computed(() => {
	if (!rsvpData.value) return '#'
	const text = `Hi Govind & Krishnendu, I have RSVP'd to your wedding!\n\nName: ${rsvpData.value.name}\nGuests: ${rsvpData.value.guests}\nAttendance: ${rsvpData.value.attendance}\n\nHere is my digital pass: ${inviteUrl.value}`
	return `https://wa.me/${couplePhone}?text=${encodeURIComponent(text)}`
})

// Google Calendar URL
const googleCalendarUrl = computed(() => {
	return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Govind+%26+Krishnendu%27s+Wedding&dates=20270109T053000Z/20270109T103000Z&details=You+are+cordially+invited+to+celebrate+the+wedding+of+Govind+%26+Krishnendu+on+Jan+9%2C+2027.+Please+bring+your+invitation+pass.&location=Thrissur%2C+Kerala%2C+India`
})

// Apple / Outlook Calendar File Download (.ics)
const downloadIcs = () => {
	const icsContent = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//KinGsHearTz//Wedding//EN',
		'BEGIN:VEVENT',
		'UID:' + Date.now() + '@kingsheartz.wedding',
		'DTSTAMP:20260526T150000Z',
		'DTSTART:20270109T053000Z', // 11:00 AM IST (Jan 9, 2027) = 5:30 AM UTC
		'DTEND:20270109T103000Z',   // 4:00 PM IST (Jan 9, 2027) = 10:30 AM UTC
		'SUMMARY:Govind & Krishnendu Wedding',
		'DESCRIPTION:You are cordially invited to celebrate the wedding of Govind & Krishnendu.',
		'LOCATION:Thrissur\\, Kerala\\, India',
		'END:VEVENT',
		'END:VCALENDAR'
	].join('\r\n')

	const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' })
	const link = document.createElement('a')
	link.href = URL.createObjectURL(blob)
	link.setAttribute('download', 'wedding_invitation.ics')
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

const handlePrint = () => {
	window.print()
}

const handleScrollToRSVP = () => {
	showInvitation.value = false
	setTimeout(() => {
		const el = document.getElementById('rsvp-section')
		if (el) el.scrollIntoView({ behavior: 'smooth' })
	}, 300)
}

const handleClose = () => {
	showInvitation.value = false
}
</script>

<template>
	<Teleport to="body">
		<Transition name="overlay-fade">
			<div v-if="showInvitation"
				class="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md print-invitation-modal"
				@click.self="handleClose">

				<!-- Close: fixed to viewport so it stays visible when the card scrolls -->
				<button @click="handleClose"
					class="fixed top-4 right-4 text-white/90 hover:text-white bg-black/40 hover:bg-black/55 rounded-full p-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300 z-60 no-print"
					aria-label="Close modal">
					<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				<!-- min-h-full inner wrapper: centers when short, scrolls from top when tall -->
				<div class="flex min-h-full items-center justify-center p-4 sm:p-6 py-8 sm:py-10">
					<div class="relative w-full max-w-lg mx-auto animate-card-zoom">

					<!-- Invitation Card Wrapper -->
					<div id="print-invitation-area"
						class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#fffbf0] via-[#fef6e5] to-[#fffbf0] border border-amber-300/40 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.6)] px-6 sm:px-10 py-10 sm:py-12 text-center text-[#5c3e21]">

						<!-- Lavender floral background (reference design) -->
						<img :src="'./wedding-invitation-background.png'" alt="" class="absolute inset-0 w-full h-full object-cover opacity-95 pointer-events-none" />
						<!-- Wash out any text baked into the reference image; our dynamic content should be the readable layer. -->
						<div class="absolute inset-0 bg-white/0 pointer-events-none" />

						<div class="relative z-10">
							<!-- Monogram / Wedding Emblem -->
							<div class="mx-auto w-24 h-24 mb-4 select-none">
								<div
									class="w-full h-full rounded-full border-2 border-dashed border-emerald-700/25 flex items-center justify-center">
									<div
										class="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-700/80 to-lime-700/60 flex flex-col items-center justify-center text-white shadow-md shadow-emerald-950/20">
										<span class="font-script text-2xl font-semibold tracking-wider">GK</span>
										<span class="text-[9px] uppercase tracking-[0.25em] opacity-85 -mt-0.5">Union</span>
									</div>
								</div>
							</div>

							<p class="font-romantic text-xs sm:text-sm uppercase tracking-[0.35em] text-emerald-800/70 mb-2 mt-8">
								Save Our Date
							</p>

							<!-- Couple Names -->
							<h2 class="text-3xl sm:text-4xl font-script text-emerald-900 mb-1 select-none">
								Govind <span class="text-emerald-700">&amp;</span> Krishnendu
							</h2>

							<!-- Decorative Line -->
							<div class="flex items-center justify-center gap-3 my-4">
								<span class="h-[0.5px] w-12 bg-emerald-700/35"></span>
								<span class="text-emerald-700">✦</span>
								<span class="h-[0.5px] w-12 bg-emerald-700/35"></span>
							</div>

							<!-- Invitation message -->
							<p class="text-sm font-light text-emerald-900/80 max-w-sm mx-auto leading-relaxed mb-6 font-poppins">
								Together with their families, they joyfully invite you to celebrate the union of their hearts on their
								auspicious wedding day.
							</p>

							<!-- Event specifications -->
							<div
								class="bg-white/60 border border-emerald-700/20 rounded-2xl p-5 mb-6 max-w-sm mx-auto shadow-sm select-none">
							<div class="grid grid-cols-3 gap-2 divide-x divide-amber-200/40 text-center">
								<div>
									<span class="block text-[10px] uppercase tracking-wider text-emerald-800/70">Day</span>
									<span class="block font-romantic text-base font-semibold text-emerald-900 mt-1">Saturday</span>
								</div>
								<div>
									<span class="block text-[10px] uppercase tracking-wider text-emerald-800/70">Date</span>
									<span class="block font-romantic text-base font-semibold text-emerald-900 mt-1">09 Jan 2027</span>
								</div>
								<div>
									<span class="block text-[10px] uppercase tracking-wider text-emerald-800/70">Venue</span>
									<span class="block font-romantic text-base font-semibold text-emerald-900 mt-1">Thrissur</span>
								</div>
							</div>
							<div class="mt-4 pt-3 border-t border-emerald-700/20 text-[11px] text-emerald-900/70 tracking-wider uppercase">
								Ceremony begins at <span class="font-semibold text-emerald-900">11:00 AM IST</span>
							</div>
						</div>

						<!-- Personalized Badge Area -->
						<div v-if="rsvpData"
							class="bg-gradient-to-r from-rose-50/80 to-amber-50/80 border border-rose-200/50 rounded-2xl py-4 px-6 mb-8 max-w-sm mx-auto text-left shadow-sm relative overflow-hidden select-none">
							<div class="absolute -right-6 -bottom-6 w-16 h-16 bg-rose-500/5 rounded-full blur-2xl"></div>
							<div class="flex items-center gap-3">
								<div
									class="w-10 h-10 bg-emerald-100/80 text-emerald-600 rounded-full flex items-center justify-center shrink-0 border border-emerald-200/30">
									<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
									</svg>
								</div>
								<div class="leading-tight">
									<span class="text-[9px] uppercase tracking-widest text-emerald-600/90 font-medium">Guest RSVP
										Pass</span>
									<h4 class="text-sm font-semibold text-rose-950 font-poppins truncate max-w-[200px] mt-0.5">
										{{ rsvpData.name }}
									</h4>
									<p class="text-xs text-amber-800/85 font-poppins">
										Attending with <span class="font-semibold text-rose-800">{{ rsvpData.guests }}</span> {{
											rsvpData.guests > 1 ? 'guests' : 'guest' }}
									</p>
								</div>
							</div>
						</div>

						<div v-else
							class="bg-[#faf5eb] border border-dashed border-amber-500/30 rounded-2xl p-4 mb-8 max-w-sm mx-auto text-center shadow-sm select-none">
							<span class="text-xs text-amber-800 font-poppins">
								Please RSVP to confirm your attendance and get a personalized entry pass!
							</span>
						</div>

						<!-- Interactive Actions (No print) -->
						<div class="flex flex-col gap-3 max-w-sm mx-auto no-print">
							<!-- RSVP Now Button (if generic) -->
							<button v-if="!rsvpData" @click="handleScrollToRSVP"
								class="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm py-3 px-6 rounded-full transition transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 flex items-center justify-center gap-2">
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
								RSVP to Confirm
							</button>

							<!-- Personalized Buttons (if RSVPData exists) -->
							<div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-2">
								<a :href="whatsappConfirmUrl" target="_blank"
									class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-2.5 px-4 rounded-full transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/15">
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
									</svg>
									Confirm to Couple
								</a>
								<a :href="whatsappShareUrl" target="_blank"
									class="w-full bg-[#1da1f2]/10 hover:bg-[#1da1f2]/20 text-[#1982c4] border border-[#1da1f2]/20 font-medium text-xs py-2.5 px-4 rounded-full transition flex items-center justify-center gap-1.5 shadow-sm">
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-6h2v6zm0-8h-2V6h2v2zm6 8h-2v-4c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v-6h2v.83c.46-.53 1.13-.83 1.87-.83 1.72 0 3.13 1.4 3.13 3.13V16z" />
									</svg>
									Share with Friends
								</a>
							</div>

							<!-- Calendar Actions -->
							<div class="flex gap-2">
								<a :href="googleCalendarUrl" target="_blank"
									class="flex-1 bg-amber-100 hover:bg-amber-200/80 text-amber-800 font-medium text-[11px] py-2 px-3 rounded-full transition flex items-center justify-center gap-1">
									Google Calendar
								</a>
								<button @click="downloadIcs"
									class="flex-1 bg-amber-100 hover:bg-amber-200/80 text-amber-800 font-medium text-[11px] py-2 px-3 rounded-full transition flex items-center justify-center gap-1">
									Apple / Outlook
								</button>
							</div>

							<!-- Download / Print Card -->
							<button @click="handlePrint"
								class="w-full border border-amber-600/30 hover:bg-amber-600/5 text-amber-900 font-medium text-xs py-2.5 px-4 rounded-full transition flex items-center justify-center gap-1.5 shadow-sm">
								<svg class="w-4 h-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
								</svg>
								Print / Download PDF Pass
							</button>
						</div>

							<!-- Royal Signature Footer -->
							<div
								class="mt-8 pt-4 border-t border-emerald-700/10 flex items-center justify-center gap-6 select-none font-poppins">
								<span class="text-[10px] tracking-[0.2em] uppercase text-emerald-800/60">With Love</span>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=Dancing+Script:wght@400;500;600&display=swap");

/* ── Overlay Fade ── */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
	transition: opacity 0.5s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
	opacity: 0;
}

/* ── Card Zoom ── */
@keyframes card-zoom {
	0% {
		opacity: 0;
		transform: scale(0.9) translateY(15px);
	}

	100% {
		opacity: 1;
		transform: scale(1) translateY(0);
	}
}

.animate-card-zoom {
	animation: card-zoom 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* ── Fonts ── */
.font-romantic {
	font-family: "Cinzel", serif;
}

.font-script {
	font-family: "Dancing Script", cursive;
}
</style>

<!-- Global Non-Scoped Print Stylesheet (Hides the entire wedding website during printing, targeting only the pass card) -->
<style>
@media print {

	/* 1. Disable all animations and transitions on print to prevent rendering freezes */
	*,
	*::before,
	*::after {
		animation: none !important;
		transition: none !important;
		transition-property: none !important;
	}

	/* 2. Hide the entire #app structure containing the rest of the website */
	#app {
		display: none !important;
		visibility: hidden !important;
		height: 0 !important;
		overflow: hidden !important;
	}

	/* 3. Overrule default overlay/backdrop styles for print */
	body>.print-invitation-modal {
		display: block !important;
		position: relative !important;
		background: white !important;
		padding: 20px 0 !important;
		margin: 0 !important;
		overflow: visible !important;
		width: 100% !important;
		height: auto !important;
	}

	/* 4. Center the Invitation Card naturally using margins (prevents vertical cutoff on physical sheets) */
	body>.print-invitation-modal #print-invitation-area {
		position: relative !important;
		margin: 20px auto !important;
		left: auto !important;
		top: auto !important;
		transform: none !important;
		width: 95% !important;
		max-width: 440px !important;
		border: 1.5px solid #d97706 !important;
		background: #fffbf0 !important;
		box-shadow: none !important;
		border-radius: 24px !important;
		padding: 36px 28px !important;
		box-sizing: border-box !important;
		page-break-inside: avoid !important;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}

	/* 5. Hide close button, share panel, and calendar options */
	.no-print {
		display: none !important;
	}
}
</style>
