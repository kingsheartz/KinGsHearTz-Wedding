<script setup lang="ts">
import { computed } from "vue"
import FlipClockDigit from "./FlipClockDigit.vue"

const props = withDefaults(
	defineProps<{
		value: string
		label: string
		minDigits?: number
		variant?: "day" | "time"
	}>(),
	{ variant: "time" },
)

const digits = computed(() => {
	const min = props.minDigits ?? 2
	const padded = props.value.padStart(min, "0")
	return padded.split("")
})
</script>

<template>
	<div class="flip-group" :class="`flip-group--${variant}`">
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
}

.flip-group-label {
	margin-top: 0.65rem;
	font-family: "Poppins", system-ui, sans-serif;
	font-size: 0.5625rem;
	font-weight: 500;
	letter-spacing: 0.2em;
	text-transform: uppercase;
	color: var(--flip-label, #a8847a);
	text-align: center;
	width: 100%;
}

@media (min-width: 640px) {
	.flip-group-label {
		margin-top: 0.75rem;
		font-size: 0.625rem;
		letter-spacing: 0.32em;
	}
}
</style>
