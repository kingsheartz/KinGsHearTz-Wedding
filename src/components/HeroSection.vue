<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { showInvitation } from "../state"
import heroPhoto from "../assets/photos/4.jpg"

const scrollToCountdown = () => {
	document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" })
}

const parallaxY = ref(0)
const pointerX = ref(0)
const pointerY = ref(0)

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
	window.addEventListener("scroll", onScroll, { passive: true })
	window.addEventListener("mousemove", onMove, { passive: true })
})

onBeforeUnmount(() => {
	window.removeEventListener("scroll", onScroll)
	window.removeEventListener("mousemove", onMove)
})
</script>

<template>
	<section
		class="hero relative min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden"
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
				class="hero-photo absolute inset-0 h-full w-full object-cover ken-burns"
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
			<p
				class="uppercase tracking-[0.3em] text-xs sm:text-sm text-rose-200/80 mb-4 animate-fade-slow"
				data-aos="fade-down"
				data-aos-duration="900"
			>
				The Wedding Of
			</p>

			<h1
				class="font-hero text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] text-white drop-shadow-2xl animate-fade-up"
				data-aos="zoom-in"
				data-aos-duration="1100"
			>
				<span class="inline-block">Govind</span>
				<span class="mx-2 sm:mx-3 text-rose-300 font-light">&amp;</span>
				<span class="inline-block">Krishnendu</span>
			</h1>

			<p
				class="mt-6 text-base sm:text-lg text-rose-50/90 mx-auto max-w-xl leading-relaxed animate-fade-up delay-150"
				data-aos="fade-up"
				data-aos-delay="200"
			>
				Together with our families, we joyfully invite you to celebrate the beginning of our forever.
			</p>

			<div
				class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300"
				data-aos="fade-up"
				data-aos-delay="450"
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

@keyframes fade-up {
	from {
		opacity: 0;
		transform: translateY(28px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-up {
	animation: fade-up 1s ease forwards;
	opacity: 0;
}

.animate-fade-slow {
	animation: fade-up 1.3s ease forwards;
	opacity: 0;
}

.delay-150 {
	animation-delay: 0.15s;
}

.delay-300 {
	animation-delay: 0.3s;
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
	.animate-fade-up,
	.animate-fade-slow {
		animation: none !important;
		opacity: 1;
	}
	.hero-media {
		transform: none !important;
	}
}
</style>
