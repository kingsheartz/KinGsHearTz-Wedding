<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import photo1 from "../assets/photos/1.jpg"
import photo2 from "../assets/photos/2.jpg"
import photo3 from "../assets/photos/3.jpg"

const photos = [
	{ src: photo1, caption: "The Beginning" },
	{ src: photo2, caption: "Together Always" },
	{ src: photo3, caption: "Forever Yours" },
]

const activeIndex = ref<number | null>(null)
const imgLoaded = ref<boolean[]>(photos.map(() => false))
const lightboxImgLoaded = ref(false)

function openLightbox(idx: number) {
	activeIndex.value = idx
	lightboxImgLoaded.value = false
	document.body.style.overflow = "hidden"
}

function closeLightbox() {
	activeIndex.value = null
	document.body.style.overflow = ""
}

function prev() {
	if (activeIndex.value === null) return
	lightboxImgLoaded.value = false
	activeIndex.value = (activeIndex.value - 1 + photos.length) % photos.length
}

function next() {
	if (activeIndex.value === null) return
	lightboxImgLoaded.value = false
	activeIndex.value = (activeIndex.value + 1) % photos.length
}

function onKey(e: KeyboardEvent) {
	if (activeIndex.value === null) return
	if (e.key === "Escape") closeLightbox()
	if (e.key === "ArrowLeft") prev()
	if (e.key === "ArrowRight") next()
}

onMounted(() => window.addEventListener("keydown", onKey))
onUnmounted(() => {
	window.removeEventListener("keydown", onKey)
	document.body.style.overflow = ""
})
</script>

<template>
	<section id="gallery" class="gal-section">

		<!-- Section header -->
		<div class="gal-header">
			<div class="gal-header-ornament">
				<span class="gal-orn-line" />
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
					<path d="M6 0.5L7.06 3.9H10.6L7.77 5.98L8.83 9.38L6 7.3L3.17 9.38L4.23 5.98L1.4 3.9H4.94Z"
						fill="rgba(190,100,100,0.6)" />
				</svg>
				<span class="gal-orn-line" />
			</div>
			<h2 class="gal-title">Memories in Frames</h2>
			<p class="gal-subtitle">
				A few moments from our journey together —<br class="hidden sm:inline" /> from quiet smiles to shared laughter.
			</p>
		</div>

		<!-- Grid -->
		<div class="gal-grid">
			<div v-for="(photo, idx) in photos" :key="idx" class="gal-card" @click="openLightbox(idx)">
				<!-- Skeleton shimmer while loading -->
				<div v-if="!imgLoaded[idx]" class="gal-skeleton" />

				<img :src="photo.src" :alt="photo.caption" class="gal-img" :class="{ 'gal-img-ready': imgLoaded[idx] }"
					loading="eager" @load="imgLoaded[idx] = true" />

				<!-- Hover overlay -->
				<div class="gal-overlay">
					<div class="gal-overlay-content">
						<div class="gal-view-icon">
							<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
								stroke-linecap="round">
								<circle cx="11" cy="11" r="7" />
								<path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
							</svg>
						</div>
						<span class="gal-view-label">View Moment</span>
					</div>
				</div>

				<!-- Bottom caption bar -->
				<div class="gal-caption-bar">
					<span class="gal-caption-text">{{ photo.caption }}</span>
					<span class="gal-caption-count">{{ idx + 1 }} / {{ photos.length }}</span>
				</div>
			</div>
		</div>

	</section>

	<!-- ── LIGHTBOX ── -->
	<Teleport to="body">
		<Transition name="lb-fade">
			<div v-if="activeIndex !== null" class="lb-backdrop" @click.self="closeLightbox">
				<!-- Close -->
				<button class="lb-close" @click="closeLightbox" aria-label="Close">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
						stroke-linecap="round">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>

				<!-- Prev -->
				<button class="lb-arrow lb-arrow-left" @click="prev" aria-label="Previous">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
						stroke-linecap="round" stroke-linejoin="round">
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</button>

				<!-- Image area -->
				<div class="lb-image-wrap">
					<div v-if="!lightboxImgLoaded" class="lb-spinner">
						<div class="lb-spin-ring" />
					</div>
					<Transition name="lb-img-fade" mode="out-in">
						<img :key="activeIndex" :src="photos[activeIndex].src" :alt="photos[activeIndex].caption" class="lb-img"
							:class="{ 'lb-img-ready': lightboxImgLoaded }" @load="lightboxImgLoaded = true" />
					</Transition>
				</div>

				<!-- Next -->
				<button class="lb-arrow lb-arrow-right" @click="next" aria-label="Next">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
						stroke-linecap="round" stroke-linejoin="round">
						<path d="M9 18l6-6-6-6" />
					</svg>
				</button>

				<!-- Caption + dots -->
				<div class="lb-footer">
					<p class="lb-caption">{{ photos[activeIndex].caption }}</p>
					<div class="lb-dots">
						<button v-for="(_, i) in photos" :key="i" class="lb-dot" :class="{ 'lb-dot-active': i === activeIndex }"
							@click="activeIndex = i; lightboxImgLoaded = false" :aria-label="`Go to photo ${i + 1}`" />
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&display=swap");

/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
.gal-section {
	padding: 96px 0 104px;
	background: linear-gradient(180deg, #fff7f7 0%, #ffffff 40%, #fffaf8 100%);
	overflow: hidden;
}

/* ─────────────────────────────────────────
   HEADER
───────────────────────────────────────── */
.gal-header {
	text-align: center;
	max-width: 560px;
	margin: 0 auto 56px;
	padding: 0 24px;
}

.gal-header-ornament {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	margin-bottom: 14px;
}

.gal-orn-line {
	display: inline-block;
	width: 40px;
	height: 0.5px;
	background: linear-gradient(to right, transparent, rgba(190, 100, 100, 0.5));
}

.gal-orn-line:last-child {
	transform: scaleX(-1);
}

.gal-title {
	font-family: "Cormorant Garamond", serif;
	font-style: italic;
	font-size: clamp(28px, 5vw, 40px);
	font-weight: 300;
	color: #8b2635;
	letter-spacing: 0.02em;
	line-height: 1.2;
	margin-bottom: 14px;
}

.gal-subtitle {
	font-family: "Cormorant Garamond", serif;
	font-size: 17px;
	font-weight: 400;
	color: #7a5a5a;
	line-height: 1.7;
	letter-spacing: 0.01em;
}

/* ─────────────────────────────────────────
   GRID
───────────────────────────────────────── */
.gal-grid {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	gap: 20px;
	max-width: 1100px;
	margin: 0 auto;
	padding: 0 20px;
}

@media (min-width: 640px) {
	.gal-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 22px;
	}
}

@media (min-width: 1024px) {
	.gal-grid {
		grid-template-columns: repeat(3, 1fr);
		gap: 26px;
	}
}

/* ─────────────────────────────────────────
   CARD
───────────────────────────────────────── */
.gal-card {
	position: relative;
	aspect-ratio: 3 / 4;
	border-radius: 20px;
	overflow: hidden;
	cursor: pointer;
	background: #f5e8e8;
	box-shadow:
		0 8px 32px rgba(180, 60, 80, 0.12),
		0 2px 8px rgba(0, 0, 0, 0.06);
	transition: transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.45s ease;
	will-change: transform;
}

.gal-card:hover {
	transform: translateY(-6px) scale(1.01);
	box-shadow:
		0 20px 60px rgba(180, 60, 80, 0.2),
		0 4px 16px rgba(0, 0, 0, 0.1);
}

/* skeleton shimmer */
.gal-skeleton {
	position: absolute;
	inset: 0;
	background: linear-gradient(90deg, #f5e8e8 25%, #fce4e4 50%, #f5e8e8 75%);
	background-size: 200% 100%;
	animation: gal-shimmer 1.6s infinite;
	z-index: 1;
}

@keyframes gal-shimmer {
	0% {
		background-position: 200% 0;
	}

	100% {
		background-position: -200% 0;
	}
}

/* image */
.gal-img {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center top;
	opacity: 0;
	transition: opacity 0.5s ease, transform 0.55s ease;
	transform: scale(1);
	z-index: 2;
	will-change: transform;
}

.gal-img-ready {
	opacity: 1;
}

.gal-card:hover .gal-img {
	transform: scale(1.07);
}

/* hover overlay */
.gal-overlay {
	position: absolute;
	inset: 0;
	z-index: 3;
	background: linear-gradient(160deg, rgba(139, 38, 53, 0.0) 0%, rgba(80, 10, 20, 0.55) 100%);
	opacity: 0;
	transition: opacity 0.4s ease;
	display: flex;
	align-items: center;
	justify-content: center;
}

.gal-card:hover .gal-overlay {
	opacity: 1;
}

.gal-overlay-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	transform: translateY(10px);
	transition: transform 0.4s cubic-bezier(0.34, 1.3, 0.64, 1);
	will-change: transform;
}

.gal-card:hover .gal-overlay-content {
	transform: translateY(0);
}

.gal-view-icon {
	width: 52px;
	height: 52px;
	border-radius: 50%;
	background: rgba(255, 240, 240, 0.22);
	border: 1px solid rgba(255, 230, 230, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
}

.gal-view-label {
	font-family: "Cinzel", serif;
	font-size: 9.5px;
	letter-spacing: 0.35em;
	text-transform: uppercase;
	color: rgba(255, 240, 235, 0.9);
}

/* caption bar */
.gal-caption-bar {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 4;
	padding: 28px 16px 14px;
	background: linear-gradient(to top, rgba(60, 10, 20, 0.62) 0%, transparent 100%);
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
}

.gal-caption-text {
	font-family: "Cormorant Garamond", serif;
	font-style: italic;
	font-size: 14px;
	font-weight: 300;
	color: rgba(255, 235, 230, 0.92);
	letter-spacing: 0.03em;
}

.gal-caption-count {
	font-family: "Cinzel", serif;
	font-size: 9px;
	letter-spacing: 0.25em;
	color: rgba(255, 220, 210, 0.65);
	padding: 3px 9px;
	border: 0.5px solid rgba(255, 200, 190, 0.3);
	border-radius: 20px;
}

/* ─────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────── */
.lb-backdrop {
	position: fixed;
	inset: 0;
	z-index: 9999;
	background: rgba(12, 4, 6, 0.96);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
	backdrop-filter: blur(12px);
}

.lb-close {
	position: absolute;
	top: 20px;
	right: 20px;
	width: 44px;
	height: 44px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.08);
	border: 0.5px solid rgba(255, 200, 190, 0.25);
	color: rgba(255, 230, 220, 0.85);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.2s, transform 0.2s;
	z-index: 10;
}

.lb-close:hover {
	background: rgba(255, 255, 255, 0.15);
	transform: scale(1.08);
}

.lb-arrow {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.07);
	border: 0.5px solid rgba(255, 200, 190, 0.2);
	color: rgba(255, 230, 220, 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.2s, transform 0.25s;
	z-index: 10;
}

.lb-arrow:hover {
	background: rgba(255, 255, 255, 0.14);
}

.lb-arrow-left {
	left: 20px;
}

.lb-arrow-right {
	right: 20px;
}

.lb-arrow-left:hover {
	transform: translateY(-50%) translateX(-2px);
}

.lb-arrow-right:hover {
	transform: translateY(-50%) translateX(2px);
}

/* image wrap */
.lb-image-wrap {
	position: relative;
	max-width: min(82vw, 700px);
	max-height: 78vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.lb-spinner {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
}

.lb-spin-ring {
	width: 36px;
	height: 36px;
	border-radius: 50%;
	border: 1.5px solid rgba(255, 200, 190, 0.15);
	border-top-color: rgba(255, 200, 190, 0.7);
	animation: lb-spin 0.8s linear infinite;
}

@keyframes lb-spin {
	to {
		transform: rotate(360deg);
	}
}

.lb-img {
	display: block;
	max-width: 100%;
	max-height: 78vh;
	width: auto;
	height: auto;
	object-fit: contain;
	border-radius: 12px;
	opacity: 0;
	transition: opacity 0.4s ease;
	box-shadow: 0 32px 80px rgba(0, 0, 0, 0.6);
}

.lb-img-ready {
	opacity: 1;
}

/* footer */
.lb-footer {
	position: absolute;
	bottom: 28px;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 14px;
}

.lb-caption {
	font-family: "Cormorant Garamond", serif;
	font-style: italic;
	font-size: 18px;
	font-weight: 300;
	color: rgba(255, 230, 220, 0.75);
	letter-spacing: 0.04em;
}

.lb-dots {
	display: flex;
	gap: 8px;
	align-items: center;
}

.lb-dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: rgba(255, 200, 190, 0.3);
	border: none;
	cursor: pointer;
	transition: background 0.25s, transform 0.25s;
	padding: 0;
}

.lb-dot-active {
	background: rgba(255, 200, 190, 0.85);
	transform: scale(1.35);
}

/* ─────────────────────────────────────────
   TRANSITIONS
───────────────────────────────────────── */
.lb-fade-enter-active,
.lb-fade-leave-active {
	transition: opacity 0.35s ease;
}

.lb-fade-enter-from,
.lb-fade-leave-to {
	opacity: 0;
}

.lb-img-fade-enter-active,
.lb-img-fade-leave-active {
	transition: opacity 0.25s ease, transform 0.3s ease;
}

.lb-img-fade-enter-from {
	opacity: 0;
	transform: scale(0.96);
}

.lb-img-fade-leave-to {
	opacity: 0;
	transform: scale(1.03);
}
</style>