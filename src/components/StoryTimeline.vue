<script setup lang="ts">
const events = [
	{
		year: "2026",
		title: "Engagement",
		text: "A promise made, surrounded by our loved ones.",
		marker: "heart" as const,
	},
	{
		year: "2027",
		title: "Wedding",
		text: "The day we become one, forever.",
		marker: "rings" as const,
	},
]
</script>

<template>
	<section id="story" class="story-section relative z-10 py-16 sm:py-24 overflow-hidden isolate">
		<div class="story-bg" aria-hidden="true">
			<div class="story-glow story-glow--left" />
			<div class="story-glow story-glow--right" />
			<span v-for="n in 6" :key="`petal-${n}`" class="story-petal" :style="{ '--i': n }" />
		</div>

		<div class="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
			<div class="story-intro text-center" data-aos="fade-up">
				<div class="story-rule" aria-hidden="true">
					<span class="story-rule-line" />
					<span class="story-rule-hearts">♥ ♥</span>
					<span class="story-rule-line" />
				</div>
				<h2 class="story-heading font-hero">
					Our Journey
					<span class="story-heading-script font-dancing text-rose-gold">Together</span>
				</h2>
				<p class="story-subtitle font-hero">
					Every moment brought us closer to this day. Here are a few milestones from our love story.
				</p>
			</div>

			<div class="story-timeline relative mt-12 sm:mt-14">
				<div class="story-rail" aria-hidden="true" />

				<ul class="story-list space-y-12 sm:space-y-16">
					<li
						v-for="(e, index) in events"
						:key="e.year"
						class="story-item"
						:class="index % 2 === 0 ? 'story-item--left' : 'story-item--right'"
						data-aos="fade-up"
						:data-aos-delay="120 + index * 100"
					>
						<div class="story-marker-wrap" aria-hidden="true">
							<span v-if="e.marker === 'heart'" class="story-marker story-marker--rings">💍</span>
							<span v-else class="story-marker story-marker--heart" title="Wedding">♥</span>
						</div>

						<div class="story-card-outer">
							<article class="story-card">
								<div class="story-card-inner">
									<p class="story-card-year font-hero">
										{{ e.year }}
										<span class="story-card-year-heart" aria-hidden="true">♥</span>
									</p>
									<h3 class="story-card-title font-hero">{{ e.title }}</h3>
									<p class="story-card-text">{{ e.text }}</p>
								</div>
								<span class="story-card-ornament" aria-hidden="true">♥</span>
							</article>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<style scoped>
.story-section {
	background: linear-gradient(180deg, #fff9f8 0%, #fff2f5 45%, #ffeef3 100%);
}

.story-bg {
	position: absolute;
	inset: 0;
	pointer-events: none;
	overflow: hidden;
}

.story-glow {
	position: absolute;
	width: min(55vw, 300px);
	height: min(60vw, 320px);
	border-radius: 50%;
	opacity: 0.45;
}

.story-glow--left {
	left: -15%;
	top: 20%;
	background: radial-gradient(circle, rgba(251, 207, 232, 0.65) 0%, transparent 65%);
}

.story-glow--right {
	right: -15%;
	bottom: 10%;
	background: radial-gradient(circle, rgba(254, 243, 199, 0.4) 0%, transparent 60%);
}

.story-petal {
	position: absolute;
	width: 8px;
	height: 10px;
	border-radius: 50% 50% 50% 0;
	background: rgba(251, 182, 206, 0.4);
	top: calc(15% + var(--i) * 11%);
	right: calc(6% + var(--i) * 8%);
	transform: rotate(calc(var(--i) * 35deg));
}

.story-rule {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.65rem;
	margin-bottom: 0.75rem;
}

.story-rule-line {
	width: min(26vw, 120px);
	height: 1px;
	background: linear-gradient(90deg, transparent, rgba(201, 154, 106, 0.6), transparent);
}

.story-rule-hearts {
	font-size: 0.55rem;
	letter-spacing: 0.35em;
	color: rgba(212, 165, 106, 0.85);
}

.story-heading {
	font-size: clamp(1.75rem, 5vw, 2.35rem);
	font-weight: 700;
	color: #6b1028;
	line-height: 1.15;
}

.story-heading-script {
	display: block;
	font-size: clamp(2.1rem, 7vw, 3rem);
	font-weight: 600;
	margin-top: 0.15rem;
}

.story-subtitle {
	margin-top: 0.85rem;
	font-size: clamp(0.9rem, 2.6vw, 1.05rem);
	line-height: 1.65;
	color: rgba(76, 29, 42, 0.78);
	max-width: 28rem;
	margin-left: auto;
	margin-right: auto;
}

.story-rail {
	position: absolute;
	left: 50%;
	top: 0;
	bottom: 0;
	width: 2px;
	transform: translateX(-50%);
	background: linear-gradient(
		180deg,
		transparent,
		rgba(212, 165, 116, 0.35) 8%,
		rgba(201, 154, 106, 0.75) 50%,
		rgba(212, 165, 106, 0.35) 92%,
		transparent
	);
	box-shadow: 0 0 12px rgba(251, 191, 36, 0.15);
}

.story-list {
	list-style: none;
	padding: 0;
	margin: 0;
}

.story-item {
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	gap: 0.75rem;
}

@media (min-width: 640px) {
	.story-item {
		grid-template-columns: 1fr 3rem 1fr;
		align-items: center;
		min-height: 8rem;
	}

	.story-item--left .story-card-outer {
		grid-column: 1;
		grid-row: 1;
		justify-self: end;
		padding-right: 0.5rem;
	}

	.story-item--left .story-marker-wrap {
		grid-column: 2;
		grid-row: 1;
	}

	.story-item--right .story-marker-wrap {
		grid-column: 2;
		grid-row: 1;
	}

	.story-item--right .story-card-outer {
		grid-column: 3;
		grid-row: 1;
		justify-self: start;
		padding-left: 0.5rem;
	}
}

.story-marker-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
}

.story-marker {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.25rem;
	height: 2.25rem;
	border-radius: 50%;
	background: linear-gradient(145deg, #fff9fb, #ffe4ec);
	border: 1px solid rgba(212, 165, 106, 0.55);
	box-shadow: 0 4px 14px rgba(136, 19, 57, 0.1);
	font-size: 1rem;
}

.story-marker--heart {
	color: #be123c;
	font-size: 0.95rem;
}

.story-marker--rings {
	font-size: 1.1rem;
	line-height: 1;
}

.story-card-outer {
	width: 100%;
	max-width: 18rem;
	margin: 0 auto;
	perspective: 900px;
}

@media (min-width: 640px) {
	.story-card-outer {
		margin: 0;
		max-width: 16.5rem;
	}
}

.story-card {
	position: relative;
	border-radius: 1.25rem;
	padding: 1px;
	background: linear-gradient(145deg, rgba(232, 200, 150, 0.85), rgba(201, 154, 106, 0.45));
	box-shadow: 0 16px 40px -12px rgba(136, 19, 57, 0.12);
	transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
}

.story-card-inner {
	border-radius: calc(1.25rem - 1px);
	padding: 1.15rem 1.25rem 1.35rem;
	background: linear-gradient(155deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 246, 249, 0.92) 100%);
	text-align: left;
}

.story-item--left .story-card-inner {
	text-align: right;
}

@media (max-width: 639px) {
	.story-item--left .story-card-inner,
	.story-item--right .story-card-inner {
		text-align: left;
	}
}

.story-card-year {
	display: inline-flex;
	align-items: center;
	gap: 0.35rem;
	font-size: 0.8125rem;
	font-weight: 600;
	color: #9f1239;
}

.story-card-year-heart {
	font-size: 0.45rem;
	color: #d4a574;
}

.story-card-title {
	margin-top: 0.35rem;
	font-size: 1.35rem;
	font-weight: 700;
	color: #6b1028;
	line-height: 1.2;
}

.story-card-text {
	margin-top: 0.5rem;
	font-size: 0.875rem;
	line-height: 1.55;
	color: rgba(55, 65, 81, 0.88);
}

.story-card-ornament {
	position: absolute;
	bottom: 0.45rem;
	left: 50%;
	transform: translateX(-50%);
	font-size: 0.4rem;
	color: rgba(212, 165, 106, 0.7);
	opacity: 0.85;
}

.story-card:hover {
	transform: translateY(-3px) rotateY(-4deg);
	box-shadow: 0 22px 48px -14px rgba(136, 19, 57, 0.16);
}

@media (prefers-reduced-motion: reduce) {
	.story-card:hover {
		transform: none;
	}
}

@media (max-width: 639px) {
	.story-rail {
		left: 1.25rem;
		transform: none;
	}

	.story-item {
		padding-left: 2.75rem;
	}

	.story-marker-wrap {
		position: absolute;
		left: 0.55rem;
		top: 1.25rem;
	}

	.story-marker {
		width: 1.85rem;
		height: 1.85rem;
		font-size: 0.85rem;
	}
}
</style>
