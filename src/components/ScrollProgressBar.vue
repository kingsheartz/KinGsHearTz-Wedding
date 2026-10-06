<script setup lang="ts">
import { useScrollProgress } from "../composables/useScrollProgress"

const { progress } = useScrollProgress()
</script>

<template>
	<div
		class="scroll-progress fixed top-0 left-0 z-[35] h-[3px] bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400 pointer-events-none"
		:style="{ width: `${progress * 100}%` }"
		aria-hidden="true"
	/>
</template>

<style scoped>
</style>
