<script setup lang="ts">
const scrollTo = (id: string) => {
	const el = document.getElementById(id);
	if (el) el.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
	<header class="fixed top-0 left-1/2 -translate-x-1/2 z-30 w-full max-w-5xl px-4 sm:px-6 pt-4 text-rose-50/90">
		<div
			class="flex items-center justify-between rounded-full bg-black/30 backdrop-blur-md border border-white/10 px-4 sm:px-6 py-2.5 shadow-lg shadow-black/40">
			<div class="flex items-center gap-2 sm:gap-3">
				<div
					class="h-8 w-8 rounded-full border border-rose-200/60 bg-rose-100/20 flex items-center justify-center text-[10px] tracking-[0.16em] uppercase">
					GK
				</div>
				<div class="hidden sm:flex flex-col items-start leading-tight">
					<span class="text-[10px] tracking-[0.25em] uppercase text-rose-200/80">
						Wedding
					</span>
					<span class="text-[11px]">Govind &amp; Krishnendu</span>
				</div>
			</div>

			<nav class="flex items-center gap-4 sm:gap-7 text-[10px] sm:text-xs uppercase tracking-[0.22em]">
				<button class="hover:text-rose-200 transition-colors" @click="scrollTo('story')">
					Story
				</button>
				<button class="hover:text-rose-200 transition-colors" @click="scrollTo('gallery')">
					Gallery
				</button>
				<button class="hover:text-rose-200 transition-colors" @click="scrollTo('rsvp-section')">
					RSVP
				</button>
			</nav>
		</div>
	</header>
</template>
