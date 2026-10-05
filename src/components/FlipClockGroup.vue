<script setup lang="ts">
import { computed } from "vue"
import FlipClockDigit from "./FlipClockDigit.vue"

const props = defineProps<{
	value: string
	label: string
	minDigits?: number
}>()

const digits = computed(() => {
	const min = props.minDigits ?? 2
	const padded = props.value.padStart(min, "0")
	return padded.split("")
})
</script>

<template>
	<div class="flip-group">
		<div class="flip-group-digits">
			<FlipClockDigit v-for="(d, i) in digits" :key="`${label}-${i}`" :value="d" />
		</div>
		<span class="flip-group-label">{{ label }}</span>
	</div>
</template>

<style scoped>
.flip-group {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-shrink: 0;
}

.flip-group-digits {
	display: flex;
	align-items: center;
	gap: 0.35rem;
}

.flip-group-label {
	margin-top: 0.5rem;
	font-family: "Poppins", system-ui, sans-serif;
	font-size: 0.625rem;
	font-weight: 500;
	letter-spacing: 0.2em;
	text-transform: uppercase;
	color: rgba(107, 16, 40, 0.72);
	text-align: center;
	width: 100%;
	padding-left: 0.2em;
}

@media (min-width: 640px) {
	.flip-group-label {
		font-size: 0.6875rem;
	}
}
</style>
