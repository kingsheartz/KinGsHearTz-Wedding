<script setup lang="ts">
import { showInvitation } from "../state"
import heroPhoto from "../assets/photos/4.jpg"
</script>

<template>
	<section
		class="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-fixed bg-cover bg-center"
	>
		<img
			:src="heroPhoto"
			alt="Govind and Krishnendu"
			class="hero-photo absolute inset-0 h-full w-full object-cover"
		/>

		<!-- Overlay (original tones) -->
		<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-rose-900/80" />

		<!-- Hero Content -->
		<div class="relative z-10 px-4 sm:px-6 pt-20 sm:pt-24">
			<p class="uppercase tracking-[0.3em] text-xs sm:text-sm text-rose-200/80 mb-4 animate-fade-slow">
				The Wedding Of
			</p>

			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-romantic text-white drop-shadow-2xl animate-fade-up">
				Govind <span class="text-rose-300">&amp;</span> Krishnendu
			</h1>

			<p class="mt-6 text-base sm:text-lg text-rose-50/90 mx-auto animate-fade-up delay-150">
				Together with our families, we joyfully invite you to celebrate the beginning of our forever.
			</p>

			<div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
				<button
					type="button"
					@click="showInvitation = true"
					class="px-8 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm sm:text-base font-medium shadow-lg shadow-rose-500/40 transition transform hover:-translate-y-0.5 hover:shadow-rose-500/60"
				>
					View Invitation
				</button>

				<div class="text-xs sm:text-sm text-rose-100/80 flex items-center gap-2">
					<span class="inline-block h-[1px] w-8 bg-rose-200/60" />
					<span>Wedding on 09 January 2027 • Thrissur</span>
					<span class="inline-block h-[1px] w-8 bg-rose-200/60" />
				</div>
			</div>
		</div>

		<!-- Soft vignette -->
		<div class="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.7)]" />
	</section>
</template>

<style scoped>
/* Portrait photo: keep both faces in frame on wide screens */
.hero-photo {
	object-position: 50% 35%;
}

@media (min-width: 768px) {
	.hero-photo {
		object-position: 50% 40%;
	}
}

@keyframes fade-up {
	0% {
		opacity: 0;
		transform: translateY(24px);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-up {
	animation: fade-up 1s ease forwards;
}

.animate-fade-slow {
	animation: fade-up 1.4s ease forwards;
}

.delay-150 {
	animation-delay: 0.15s;
}

.delay-300 {
	animation-delay: 0.3s;
}
</style>
