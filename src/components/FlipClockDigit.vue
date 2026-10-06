<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue"

const props = defineProps<{
	value: string
}>()

const FLIP_HALF_MS = 300
/** Top flap, then bottom flap — sequential, not overlapping */
const FLIP_MS = FLIP_HALF_MS * 2

const topStatic = ref(props.value)
const bottomStatic = ref(props.value)
const isFlipping = ref(false)
const flipOld = ref(props.value)
const flipNew = ref(props.value)

let flipTimer: number | undefined
let topRevealTimer: number | undefined

function clearFlipTimers() {
	if (flipTimer) {
		window.clearTimeout(flipTimer)
		flipTimer = undefined
	}
	if (topRevealTimer) {
		window.clearTimeout(topRevealTimer)
		topRevealTimer = undefined
	}
}

watch(
	() => props.value,
	(next) => {
		if (next === bottomStatic.value && !isFlipping.value) return

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		if (reduced) {
			clearFlipTimers()
			topStatic.value = next
			bottomStatic.value = next
			isFlipping.value = false
			return
		}

		clearFlipTimers()

		const from = bottomStatic.value
		flipOld.value = from
		flipNew.value = next
		// Full old digit on both halves while the top flap drops
		topStatic.value = from
		bottomStatic.value = from
		isFlipping.value = true

		topRevealTimer = window.setTimeout(() => {
			topRevealTimer = undefined
			topStatic.value = next
		}, FLIP_HALF_MS)

		flipTimer = window.setTimeout(() => {
			flipTimer = undefined
			bottomStatic.value = next
			isFlipping.value = false
		}, FLIP_MS)
	},
)

onBeforeUnmount(() => clearFlipTimers())
</script>

<template>
	<div class="flip-card" :class="{ flipping: isFlipping }">
		<div class="flip-card-inner">
			<div class="flip-card-face flip-card-face-top">
				<span class="flip-card-number">{{ topStatic }}</span>
			</div>
			<div class="flip-card-face flip-card-face-bottom">
				<span class="flip-card-number">{{ bottomStatic }}</span>
			</div>

			<div v-if="isFlipping" class="flip-card-top-flip">
				<span class="flip-card-number">{{ flipOld }}</span>
			</div>
			<div v-if="isFlipping" class="flip-card-bottom-flip">
				<span class="flip-card-number">{{ flipNew }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.flip-card {
	width: var(--flip-w);
	height: var(--flip-h);
	position: relative;
	perspective: 400px;
	flex-shrink: 0;
	border-radius: var(--flip-radius);
}

.flip-card::before {
	content: "";
	position: absolute;
	inset: 0;
	border-radius: inherit;
	box-shadow: var(--flip-outer-shadow);
	pointer-events: none;
	z-index: -1;
}

.flip-card-inner {
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: inherit;
	border: 1px solid var(--flip-border);
	box-shadow: var(--flip-inset-highlight);
	overflow: hidden;
}

.flip-card-inner::after {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	height: 1px;
	margin-top: -0.5px;
	background: var(--flip-hinge);
	z-index: 5;
	pointer-events: none;
}

.flip-card-face,
.flip-card-top-flip,
.flip-card-bottom-flip {
	position: absolute;
	left: 0;
	width: 100%;
	height: 50%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	backface-visibility: hidden;
	-webkit-backface-visibility: hidden;
}

.flip-card-face-top,
.flip-card-top-flip {
	top: 0;
	align-items: flex-end;
	background: var(--flip-face);
	background-size: 100% var(--flip-h);
	background-position: top center;
	border-radius: var(--flip-radius) var(--flip-radius) 0 0;
}

.flip-card-face-bottom,
.flip-card-bottom-flip {
	bottom: 0;
	align-items: flex-start;
	background: var(--flip-face);
	background-size: 100% var(--flip-h);
	background-position: bottom center;
	border-radius: 0 0 var(--flip-radius) var(--flip-radius);
}

.flip-card-number {
	font-family: "Poppins", system-ui, sans-serif;
	font-size: var(--flip-font);
	font-weight: 600;
	line-height: 1;
	color: var(--flip-digit);
	font-variant-numeric: tabular-nums;
	-webkit-font-smoothing: antialiased;
}

.flip-card-face-top .flip-card-number,
.flip-card-top-flip .flip-card-number {
	transform: translateY(50%);
}

.flip-card-face-bottom .flip-card-number,
.flip-card-bottom-flip .flip-card-number {
	transform: translateY(-50%);
}

.flip-card-top-flip {
	transform-origin: bottom;
	z-index: 3;
}

.flip-card-bottom-flip {
	transform-origin: top;
	transform: rotateX(90deg);
	z-index: 4;
}

.flip-card.flipping .flip-card-top-flip {
	animation: flip-top var(--flip-half-ms, 300ms) ease-in forwards;
}

.flip-card.flipping .flip-card-bottom-flip {
	animation: flip-bottom var(--flip-half-ms, 300ms) ease-out var(--flip-half-ms, 300ms) forwards;
}

@keyframes flip-top {
	from {
		transform: rotateX(0deg);
	}
	to {
		transform: rotateX(-90deg);
	}
}

@keyframes flip-bottom {
	from {
		transform: rotateX(90deg);
	}
	to {
		transform: rotateX(0deg);
	}
}

@media (prefers-reduced-motion: reduce) {
	.flip-card.flipping .flip-card-top-flip,
	.flip-card.flipping .flip-card-bottom-flip {
		animation: none;
	}
}
</style>
