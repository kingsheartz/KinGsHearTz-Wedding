<script setup lang="ts">
import { useScrollProgress } from "../composables/useScrollProgress"

const { progress } = useScrollProgress()
</script>

<template>
	<div
		class="scroll-progress fixed top-0 left-0 right-0 z-[35] h-[3px] origin-left bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400 transition-transform duration-150 ease-out pointer-events-none"
		:style="{ transform: `scaleX(${progress})` }"
		aria-hidden="true"
	/>
</template>

<style scoped>
.scroll-progress {
	transform-origin: left center;
}
</style>
