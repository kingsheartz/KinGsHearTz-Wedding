<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue"

const HEART_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`

const onMove = (e: MouseEvent) => {
	const heart = document.createElement("div")
	heart.className = "cursor-heart"
	heart.innerHTML = HEART_SVG
	heart.style.left = `${e.pageX}px`
	heart.style.top = `${e.pageY}px`

	const size = 10 + Math.random() * 8
	const rot = Math.random() * 24 - 12
	heart.style.width = `${size}px`
	heart.style.height = `${size}px`
	heart.style.setProperty("--heart-rot", `${rot}deg`)

	document.body.appendChild(heart)
	window.setTimeout(() => heart.remove(), 600)
}

onMounted(() => {
	const coarse = window.matchMedia("(pointer: coarse)").matches
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
	if (coarse || reduced) return
	document.addEventListener("mousemove", onMove, { passive: true })
})

onBeforeUnmount(() => {
	document.removeEventListener("mousemove", onMove)
})
</script>

<template></template>

<style>
.cursor-heart {
	position: absolute;
	pointer-events: none;
	z-index: 9999;
	color: #f43f5e;
	filter: drop-shadow(0 0 3px rgba(244, 63, 94, 0.45));
	animation: heart-trail 0.6s linear forwards;
}

.cursor-heart svg {
	display: block;
	width: 100%;
	height: 100%;
}

@keyframes heart-trail {
	0% {
		transform: translate(-50%, -50%) rotate(var(--heart-rot, 0deg)) scale(1);
		opacity: 1;
	}
	100% {
		transform: translate(-50%, -50%) rotate(var(--heart-rot, 0deg)) scale(2.2);
		opacity: 0;
	}
}

@media (prefers-reduced-motion: reduce) {
	.cursor-heart {
		animation: none;
		opacity: 0;
	}
}
</style>
