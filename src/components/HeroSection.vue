<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { showInvitation } from "../state"
import { scrollToSection } from "../composables/useHashNavigation"
import heroPhoto from "../assets/photos/4.jpg"

const scrollToCountdown = () => {
	scrollToSection("countdown", "smooth")
}

const parallaxY = ref(0)
const pointerX = ref(0)
const pointerY = ref(0)
const photoReady = ref(false)

const KICKER = "The Wedding Of"
const NAMES = "Govind & Krishnendu"
const INVITE =
	"Together with our families, we joyfully invite you to celebrate the beginning of our forever."

const kickerText = ref("")
const namesText = ref("")
const inviteText = ref("")
const writePhase = ref<"idle" | "kicker" | "names" | "invite" | "done">("idle")
const showActions = ref(false)

let typewriterTimers: number[] = []
let heroWritingStarted = false

function onPhotoReady() {
	photoReady.value = true
	if (heroWritingStarted) return
	heroWritingStarted = true
	startHeroWriting()
}

function clearTypewriter() {
	typewriterTimers.forEach((id) => window.clearTimeout(id))
	typewriterTimers = []
}

function typeLine(
	target: { value: string },
	full: string,
	charMs: number,
	onDone?: () => void,
	initialDelay = 0,
) {
	const startId = window.setTimeout(() => {
		let index = 0
		const tick = () => {
			index += 1
			target.value = full.slice(0, index)
			if (index < full.length) {
				typewriterTimers.push(window.setTimeout(tick, charMs))
			} else {
				onDone?.()
			}
		}
		tick()
	}, initialDelay)
	typewriterTimers.push(startId)
}

function startHeroWriting() {
	clearTypewriter()
	kickerText.value = ""
	namesText.value = ""
	inviteText.value = ""
	showActions.value = false

	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
	if (reduced) {
		kickerText.value = KICKER
		namesText.value = NAMES
		inviteText.value = INVITE
		writePhase.value = "done"
		showActions.value = true
		return
	}

	writePhase.value = "kicker"
	typeLine(kickerText, KICKER, 52, () => {
		writePhase.value = "names"
		typeLine(namesText, NAMES, 58, () => {
			writePhase.value = "invite"
			typeLine(inviteText, INVITE, 26, () => {
				writePhase.value = "done"
				showActions.value = true
			}, 220)
		}, 280)
	}, 500)
}

const onScroll = () => {
	parallaxY.value = Math.min(window.scrollY * 0.35, 180)
}

const onMove = (e: MouseEvent) => {
	const w = window.innerWidth
	const h = window.innerHeight
	pointerX.value = (e.clientX / w - 0.5) * 12
	pointerY.value = (e.clientY / h - 0.5) * 8
}

onMounted(() => {
	const img = new Image()
	img.src = heroPhoto
	if (img.complete) {
		onPhotoReady()
	} else {
		img.onload = onPhotoReady
	}

	window.addEventListener("scroll", onScroll, { passive: true })
	window.addEventListener("mousemove", onMove, { passive: true })
})

onBeforeUnmount(() => {
	clearTypewriter()
	window.removeEventListener("scroll", onScroll)
	window.removeEventListener("mousemove", onMove)
})
</script>

<template>
	<section
		id="hero"
		class="hero relative min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#1a1014]"
	>
		<div
			class="hero-media absolute inset-0 will-change-transform"
			:style="{
				transform: `translate3d(${pointerX}px, ${parallaxY + pointerY}px, 0) scale(1.08)`,
			}"
		>
			<img
				:src="heroPhoto"
				alt="Govind and Krishnendu"
				class="hero-photo absolute inset-0 h-full w-full object-cover ken-burns transition-opacity duration-700 ease-out"
				:class="photoReady ? 'opacity-100' : 'opacity-0'"
				loading="eager"
				fetchpriority="high"
				decoding="async"
				@load="onPhotoReady"
			/>
		</div>

		<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-rose-950/90" />
		<div
			class="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.35),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(244,63,94,0.35),transparent_50%)]"
		/>

		<div
			class="relative z-10 px-4 sm:px-6 pt-24 pb-28 max-w-3xl transition-transform duration-300 ease-out"
			:style="{ transform: `translate3d(${pointerX * -0.3}px, ${pointerY * -0.3}px, 0)` }"
		>
			<p class="hero-write hero-write-kicker uppercase tracking-[0.3em] text-xs sm:text-sm text-rose-200/80 mb-4">
				<span class="hero-write-text">{{ kickerText }}</span>
				<span
					v-if="writePhase === 'kicker'"
					class="hero-write-cursor"
					aria-hidden="true"
				/>
			</p>

			<h1
				class="hero-write hero-write-title font-hero text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] text-white drop-shadow-2xl"
			>
				<span class="hero-write-text">{{ namesText }}</span>
				<span
					v-if="writePhase === 'names'"
					class="hero-write-cursor hero-write-cursor--light"
					aria-hidden="true"
				/>
			</h1>

			<p
				class="hero-write hero-write-invite mt-6 text-base sm:text-lg text-rose-50/90 mx-auto max-w-xl leading-relaxed min-h-[4.5rem] sm:min-h-[3.25rem]"
			>
				<span class="hero-write-text">{{ inviteText }}</span>
				<span
					v-if="writePhase === 'invite'"
					class="hero-write-cursor hero-write-cursor--light"
					aria-hidden="true"
				/>
			</p>

			<div
				class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700"
				:class="showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'"
			>
				<button
					type="button"
					class="btn-glow px-8 py-3.5 rounded-full bg-rose-500 text-white text-sm sm:text-base font-medium"
					@click="showInvitation = true"
				>
					View Invitation
				</button>

				<div class="text-xs sm:text-sm text-rose-100/80 flex items-center gap-2">
					<span class="inline-block h-px w-8 bg-rose-200/60" />
					<span>Wedding on 09 January 2027 • Thrissur</span>
					<span class="inline-block h-px w-8 bg-rose-200/60" />
				</div>
			</div>
		</div>

		<button
			type="button"
			class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-rose-100/70 hover:text-white transition animate-bounce-soft"
			aria-label="Scroll to explore"
			@click="scrollToCountdown"
		>
			<span class="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
			<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		<div class="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.65)]" />
	</section>
</template>

<style scoped>
.hero-photo {
	object-position: 50% 35%;
}

@media (min-width: 768px) {
	.hero-photo {
		object-position: 50% 40%;
	}
}

.hero-write {
	min-height: 1.2em;
}

.hero-write-kicker {
	min-height: 1.5em;
}

.hero-write-title {
	min-height: 1.15em;
}

.hero-write-text {
	white-space: pre-wrap;
}

.hero-write-cursor {
	display: inline-block;
	width: 2px;
	height: 0.85em;
	margin-left: 2px;
	vertical-align: -0.08em;
	background: rgba(251, 207, 232, 0.95);
	animation: hero-cursor-blink 0.85s step-end infinite;
}

.hero-write-cursor--light {
	background: rgba(255, 255, 255, 0.92);
}

@keyframes hero-cursor-blink {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}

@keyframes bounce-soft {
	0%,
	100% {
		transform: translate(-50%, 0);
	}
	50% {
		transform: translate(-50%, 6px);
	}
}

.animate-bounce-soft {
	animation: bounce-soft 2.2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
	.ken-burns,
	.animate-bounce-soft,
	.hero-write-cursor {
		animation: none !important;
		opacity: 1;
	}
	.hero-media {
		transform: none !important;
	}
	.hero-photo {
		opacity: 1 !important;
		transition: none;
	}
}
</style>
