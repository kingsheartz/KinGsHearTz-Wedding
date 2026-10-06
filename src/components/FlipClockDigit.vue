<script setup lang="ts">
import { ref, watch } from "vue"

const props = defineProps<{
	value: string
}>()

const FLIP_MS = 300

const topStatic = ref(props.value)
const bottomStatic = ref(props.value)
const isFlipping = ref(false)
const flipOld = ref(props.value)
const flipNew = ref(props.value)

let flipTimer: number | undefined

watch(
	() => props.value,
	(next) => {
		if (next === topStatic.value && !isFlipping.value) return

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		if (reduced) {
			topStatic.value = next
			bottomStatic.value = next
			return
		}

		if (flipTimer) window.clearTimeout(flipTimer)

		flipOld.value = topStatic.value
		flipNew.value = next
		topStatic.value = next
		bottomStatic.value = flipOld.value
		isFlipping.value = true

		flipTimer = window.setTimeout(() => {
			bottomStatic.value = next
			isFlipping.value = false
		}, FLIP_MS)
	},
)
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
}

.flip-card-inner {
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: var(--flip-radius);
	overflow: hidden;
	box-shadow: var(--flip-shadow);
}

.flip-card-inner::after {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	height: 1px;
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
}

.flip-card-face-top,
.flip-card-top-flip {
	top: 0;
	align-items: flex-end;
	background: var(--flip-face-top);
	border-radius: var(--flip-radius) var(--flip-radius) 0 0;
}

.flip-card-face-bottom,
.flip-card-bottom-flip {
	bottom: 0;
	align-items: flex-start;
	background: var(--flip-face-bottom);
	border-radius: 0 0 var(--flip-radius) var(--flip-radius);
}

.flip-card-face-top,
.flip-card-face-bottom {
	border: 1px solid var(--flip-border);
}

.flip-card-face-top {
	border-bottom: none;
}

.flip-card-face-bottom {
	border-top: none;
}

.flip-card-number {
	font-family: "Poppins", system-ui, sans-serif;
	font-size: var(--flip-font);
	font-weight: 600;
	line-height: 1;
	color: var(--flip-digit);
	font-variant-numeric: tabular-nums;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
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
	z-index: 2;
	border: 1px solid var(--flip-border);
	border-bottom: none;
}

.flip-card-bottom-flip {
	transform-origin: top;
	transform: rotateX(90deg);
	z-index: 1;
	border: 1px solid var(--flip-border);
	border-top: none;
}

.flip-card.flipping .flip-card-top-flip {
	animation: flip-top 0.3s ease-in forwards;
}

.flip-card.flipping .flip-card-bottom-flip {
	animation: flip-bottom 0.3s ease-out 0.15s forwards;
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
