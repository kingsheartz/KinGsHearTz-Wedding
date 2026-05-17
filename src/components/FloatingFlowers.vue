<script setup lang="ts">
const petals = Array.from({ length: 18 }, (_, i) => ({
	id: i,
	left: Math.random() * 100,
	delay: Math.random() * 6,
	duration: 10 + Math.random() * 8,
	size: 10 + Math.random() * 20
}))
</script>

<template>
	<div class="pointer-events-none fixed inset-0 overflow-hidden z-20">
		<img v-for="p in petals" :key="p.id" src="/flowers/rose.png" class="absolute opacity-80" :style="{
			left: p.left + '%',
			width: p.size + 'px',
			height: 'auto',
			animationDelay: p.delay + 's',
			animationDuration: p.duration + 's'
		}" alt="" />
	</div>
</template>

<style scoped>
@keyframes flower-fall {
	0% {
		transform: translate3d(0, -120%, 0) rotate(0deg);
		opacity: 0;
	}

	10% {
		opacity: 0.85;
	}

	100% {
		transform: translate3d(0, 120vh, 0) rotate(80deg);
		opacity: 0;
	}
}

img {
	animation: flower-fall linear infinite;
}
</style>
