<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

const enabled = ref(true)

onMounted(() => {
	const coarse = window.matchMedia("(pointer: coarse)").matches
	const narrow = window.matchMedia("(max-width: 768px)").matches
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
	enabled.value = !coarse && !narrow && !reduced
})

const petals = computed(() =>
	Array.from({ length: enabled.value ? 12 : 0 }, (_, i) => ({
		id: i,
		left: (i * 17 + 5) % 100,
		delay: (i * 0.7) % 6,
		duration: 12 + (i % 5),
		size: 10 + (i % 4) * 4,
	})),
)
</script>

<template>
	<div
		v-if="enabled"
		class="flowers-layer pointer-events-none fixed inset-0 overflow-hidden z-[1] opacity-35"
		aria-hidden="true"
	>
		<img
			v-for="p in petals"
			:key="p.id"
			src="/flowers/rose.png"
			class="flower-petal absolute opacity-60"
			:style="{
				left: p.left + '%',
				width: p.size + 'px',
				height: 'auto',
				animationDelay: p.delay + 's',
				animationDuration: p.duration + 's',
			}"
			alt=""
		/>
	</div>
</template>

<style scoped>
@keyframes flower-fall {
	0% {
		transform: translate3d(0, -120%, 0) rotate(0deg);
		opacity: 0;
	}

	12% {
		opacity: 0.55;
	}

	100% {
		transform: translate3d(0, 120vh, 0) rotate(80deg);
		opacity: 0;
	}
}

.flowers-layer {
	contain: strict;
}

.flower-petal {
	animation: flower-fall linear infinite;
}

@media (prefers-reduced-motion: reduce) {
	.flower-petal {
		animation: none;
		display: none;
	}
}
</style>
