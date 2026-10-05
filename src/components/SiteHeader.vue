<script setup lang="ts">
import { ref } from 'vue';
import { showAdminRSVP } from '../state';

const scrollTo = (id: string) => {
	const el = document.getElementById(id);
	if (el) el.scrollIntoView({ behavior: "smooth" });
};

const clickCount = ref(0);
let clickTimer: number | null = null;

const handleLogoClick = () => {
	clickCount.value++;
	if (clickTimer) clearTimeout(clickTimer);

	if (clickCount.value >= 5) {
		showAdminRSVP.value = true;
		clickCount.value = 0;
	} else {
		clickTimer = window.setTimeout(() => {
			clickCount.value = 0;
		}, 1000);
	}
};
</script>

<template>
	<!-- Match #app shell in style.css (1126px max, centered) so the pill stays inside the page column -->
	<header class="site-header fixed top-0 inset-x-0 z-30 pt-4">
		<div class="site-header-shell mx-auto box-border w-full max-w-[1126px] px-4 sm:px-6">
			<div
				class="site-header-pill flex w-full min-w-0 items-center justify-between gap-2 rounded-full border border-white/15 bg-black/35 px-3 sm:px-5 py-2.5 shadow-lg shadow-black/30 backdrop-blur-xl"
			>
				<div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 overflow-hidden">
					<div
						@click="handleLogoClick"
						class="h-9 w-9 shrink-0 rounded-full border border-rose-200/50 bg-gradient-to-br from-rose-400/30 to-rose-900/40 flex items-center justify-center text-[10px] tracking-[0.16em] uppercase cursor-pointer select-none font-medium"
					>
						GK
					</div>
					<div class="hidden sm:flex min-w-0 flex-col items-start leading-tight overflow-hidden">
						<span class="text-[10px] tracking-[0.22em] uppercase text-rose-200/80">
							Wedding
						</span>
						<span class="text-[11px] text-white/90 truncate max-w-full">Govind &amp; Krishnendu</span>
					</div>
				</div>

				<nav class="site-header-nav flex shrink-0 items-center justify-end gap-2 sm:gap-3 md:gap-5">
					<button type="button" class="whitespace-nowrap hover:text-rose-200 transition-colors" @click="scrollTo('story')">
						Story
					</button>
					<button type="button" class="whitespace-nowrap hover:text-rose-200 transition-colors" @click="scrollTo('gallery')">
						Gallery
					</button>
					<button type="button" class="hidden md:inline whitespace-nowrap hover:text-rose-200 transition-colors" @click="scrollTo('events')">
						Events
					</button>
					<button type="button" class="whitespace-nowrap hover:text-rose-200 transition-colors" @click="scrollTo('rsvp-section')">
						RSVP
					</button>
				</nav>
			</div>
		</div>
	</header>
</template>

<style scoped>
.site-header-nav {
	font-size: 10px;
	text-transform: uppercase;
	letter-spacing: 0.1em;
}

@media (min-width: 640px) {
	.site-header-nav {
		font-size: 11px;
		letter-spacing: 0.14em;
	}
}

@media (min-width: 768px) {
	.site-header-nav {
		font-size: 12px;
		letter-spacing: 0.16em;
	}
}
</style>
