<script setup lang="ts">
import { ref } from "vue"
import { showAdminRSVP } from "../state"
import { useScrollSpy } from "../composables/useScrollSpy"
import { useRafScroll } from "../composables/useRafScroll"

const navItems = [
	{ id: "story", label: "Story" },
	{ id: "video", label: "Video" },
	{ id: "gallery", label: "Gallery" },
	{ id: "events", label: "Events", mdOnly: true },
	{ id: "rsvp-section", label: "RSVP" },
]

const { activeId } = useScrollSpy(navItems.map((n) => n.id))

const scrolled = ref(false)

const scrollTo = (id: string) => {
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

useRafScroll(() => {
	scrolled.value = window.scrollY > 48
})

const clickCount = ref(0)
let clickTimer: number | null = null

const handleLogoClick = () => {
	clickCount.value++
	if (clickTimer) clearTimeout(clickTimer)
	if (clickCount.value >= 5) {
		showAdminRSVP.value = true
		clickCount.value = 0
	} else {
		clickTimer = window.setTimeout(() => {
			clickCount.value = 0
		}, 1000)
	}
}

</script>

<template>
	<header class="site-header fixed top-0 inset-x-0 z-30 pt-3 sm:pt-4 transition-[padding] duration-300">
		<div class="site-header-shell mx-auto box-border w-full max-w-[1126px] px-4 sm:px-6">
			<div
				class="site-header-pill flex w-full min-w-0 items-center justify-between gap-2 rounded-full px-3 sm:px-5 py-2.5 transition-all duration-300"
				:class="
					scrolled
						? 'border border-rose-200/20 bg-[#0f1018]/85 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl'
						: 'border border-white/15 bg-black/30 shadow-lg shadow-black/25 backdrop-blur-xl'
				"
			>
				<div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 overflow-hidden">
					<div
						class="logo-ring h-9 w-9 shrink-0 rounded-full border border-rose-200/50 bg-gradient-to-br from-rose-400/35 to-rose-950/50 flex items-center justify-center text-[10px] tracking-[0.16em] uppercase cursor-pointer select-none font-medium text-white"
						@click="handleLogoClick"
					>
						GK
					</div>
					<div class="hidden sm:flex min-w-0 flex-col items-start leading-tight overflow-hidden text-left">
						<span class="text-[10px] tracking-[0.22em] uppercase text-rose-200/80">Wedding</span>
						<span class="text-[11px] text-white/90 truncate max-w-full">Govind &amp; Krishnendu</span>
					</div>
				</div>

				<nav class="site-header-nav flex shrink-0 items-center justify-end gap-1 sm:gap-2 md:gap-4 text-rose-50/90">
					<button
						v-for="item in navItems"
						:key="item.id"
						type="button"
						class="nav-link relative whitespace-nowrap px-2 py-1 rounded-full transition-colors hover:text-rose-200"
						:class="[
							item.mdOnly ? 'hidden md:inline' : '',
							activeId === item.id ? 'text-rose-200 bg-white/10' : '',
						]"
						@click="scrollTo(item.id)"
					>
						{{ item.label }}
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
	letter-spacing: 0.12em;
}

@media (min-width: 640px) {
	.site-header-nav {
		font-size: 11px;
		letter-spacing: 0.14em;
	}
}

.logo-ring {
	transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.logo-ring:hover {
	transform: rotate(-8deg) scale(1.05);
	box-shadow: 0 0 24px rgba(244, 63, 94, 0.35);
}
</style>
