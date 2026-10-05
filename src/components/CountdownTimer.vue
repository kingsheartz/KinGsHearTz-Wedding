<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import launchFireworks from "./Fireworks"
import FlipClockGroup from "./FlipClockGroup.vue"

const weddingDate = new Date("2027-01-09T00:00:00")
const startDate = new Date("2026-01-01T00:00:00")

const daysNum = ref(0)
const hoursNum = ref(0)
const minutesNum = ref(0)
const secondsNum = ref(0)
const isWeddingDay = ref(false)

const daysStr = computed(() => String(daysNum.value))
const hoursStr = computed(() => hoursNum.value.toString().padStart(2, "0"))
const minutesStr = computed(() => minutesNum.value.toString().padStart(2, "0"))
const secondsStr = computed(() => secondsNum.value.toString().padStart(2, "0"))
const daysMinDigits = computed(() => (daysNum.value >= 100 ? 3 : 2))

const progressToWedding = computed(() => {
	const total = weddingDate.getTime() - startDate.getTime()
	const elapsed = Date.now() - startDate.getTime()
	if (total <= 0) return 100
	return Math.min(100, Math.max(0, (elapsed / total) * 100))
})

let timerId: number | undefined

const updateTime = () => {
	const diff = weddingDate.getTime() - new Date().getTime()

	if (diff <= 0) {
		if (!isWeddingDay.value) launchFireworks()
		isWeddingDay.value = true
		daysNum.value = 0
		hoursNum.value = 0
		minutesNum.value = 0
		secondsNum.value = 0
		if (timerId) clearInterval(timerId)
		return
	}

	daysNum.value = Math.floor(diff / (1000 * 60 * 60 * 24))
	hoursNum.value = Math.floor((diff / (1000 * 60 * 60)) % 24)
	minutesNum.value = Math.floor((diff / (1000 * 60)) % 60)
	secondsNum.value = Math.floor((diff / 1000) % 60)
}

onMounted(() => {
	updateTime()
	timerId = window.setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
	if (timerId) clearInterval(timerId)
})
</script>

<template>
	<section id="countdown" class="countdown-section relative z-10 py-16 sm:py-24 overflow-hidden isolate">
		<div class="countdown-bg" aria-hidden="true">
			<div class="countdown-glow countdown-glow--left" />
			<div class="countdown-glow countdown-glow--right" />
			<span v-for="n in 8" :key="`petal-${n}`" class="countdown-petal" :style="{ '--i': n }" />
		</div>

		<div class="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
			<div class="countdown-intro" data-aos="fade-up">
				<div class="countdown-rule" aria-hidden="true">
					<span class="countdown-rule-line" />
					<span class="countdown-rule-heart">♥</span>
					<span class="countdown-rule-line" />
				</div>
				<p class="countdown-kicker font-hero">Save the date</p>
				<h2 class="countdown-heading font-hero">
					Countdown to Our
					<span class="countdown-heading-script font-dancing text-rose-gold">Forever</span>
					<span class="countdown-heading-heart" aria-hidden="true">♡</span>
				</h2>
				<p class="countdown-date font-hero">
					<span class="countdown-date-gem" aria-hidden="true">♥</span>
					09 January 2027 · Thrissur
					<span class="countdown-date-gem" aria-hidden="true">♥</span>
				</p>
				<p class="countdown-copy font-hero">
					We can’t wait to say “I do”. Until then, every second brings us closer to celebrating with you.
				</p>
			</div>

			<div
				v-if="!isWeddingDay"
				class="countdown-shell flip-card-themed"
				data-aos="fade-up"
				data-aos-delay="160"
			>
				<span class="countdown-shell-heart countdown-shell-heart--left" aria-hidden="true">♥</span>
				<span class="countdown-shell-heart countdown-shell-heart--right" aria-hidden="true">♥</span>
				<span class="countdown-shell-heart countdown-shell-heart--bottom" aria-hidden="true">♥</span>

				<div class="flip-clock-scroll">
					<div class="flip-clock-digits">
						<FlipClockGroup :value="daysStr" label="Days" :min-digits="daysMinDigits" />
						<span class="flip-separator" aria-hidden="true"><i /><i /></span>
						<FlipClockGroup :value="hoursStr" label="Hours" :min-digits="2" />
						<span class="flip-separator" aria-hidden="true"><i /><i /></span>
						<FlipClockGroup :value="minutesStr" label="Minutes" :min-digits="2" />
						<span class="flip-separator" aria-hidden="true"><i /><i /></span>
						<FlipClockGroup :value="secondsStr" label="Seconds" :min-digits="2" />
					</div>
				</div>
			</div>

			<div
				v-else
				class="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-rose-500 text-white shadow-lg shadow-rose-400/60"
				data-aos="zoom-in"
			>
				<span class="text-lg font-medium">Today is the big day!</span>
			</div>

			<div class="mt-10 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="240">
				<div class="flex justify-between text-[10px] uppercase tracking-wider text-rose-400 mb-2">
					<span>Journey</span>
					<span>{{ progressToWedding.toFixed(0) }}%</span>
				</div>
				<div class="h-1.5 rounded-full bg-rose-100 overflow-hidden">
					<div
						class="h-full rounded-full bg-gradient-to-r from-rose-400 to-amber-400 transition-[width] duration-1000 ease-out"
						:style="{ width: `${progressToWedding}%` }"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.countdown-section {
	background: linear-gradient(180deg, #fff9f7 0%, #fff0f4 40%, #ffe8ef 100%);
}

.countdown-bg {
	position: absolute;
	inset: 0;
	pointer-events: none;
	overflow: hidden;
}

.countdown-glow {
	position: absolute;
	width: min(50vw, 280px);
	height: min(55vw, 300px);
	border-radius: 50%;
	filter: blur(1px);
	opacity: 0.5;
}

.countdown-glow--left {
	left: -12%;
	bottom: 5%;
	background: radial-gradient(circle, rgba(251, 207, 232, 0.7) 0%, transparent 65%);
}

.countdown-glow--right {
	right: -12%;
	bottom: 8%;
	background: radial-gradient(circle, rgba(254, 243, 199, 0.45) 0%, transparent 60%);
}

.countdown-petal {
	position: absolute;
	width: 8px;
	height: 11px;
	border-radius: 50% 50% 50% 0;
	background: rgba(251, 182, 206, 0.45);
	top: calc(10% + var(--i) * 8%);
	left: calc(4% + var(--i) * 10%);
	transform: rotate(calc(var(--i) * 28deg));
	animation: petal-float 16s ease-in-out infinite;
	animation-delay: calc(var(--i) * -1.2s);
}

@keyframes petal-float {
	0%,
	100% {
		transform: translateY(0) rotate(calc(var(--i) * 28deg));
	}
	50% {
		transform: translateY(-14px) rotate(calc(var(--i) * 28deg + 10deg));
	}
}

.countdown-rule {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	margin-bottom: 0.85rem;
}

.countdown-rule-line {
	width: min(28vw, 140px);
	height: 1px;
	background: linear-gradient(90deg, transparent, rgba(201, 154, 106, 0.65), transparent);
}

.countdown-rule-heart {
	font-size: 0.65rem;
	color: #e8a0a8;
}

.countdown-kicker {
	font-size: 0.6875rem;
	font-weight: 600;
	letter-spacing: 0.38em;
	text-transform: uppercase;
	color: #c9956c;
	margin-bottom: 0.5rem;
}

.countdown-heading {
	font-size: clamp(1.65rem, 5.5vw, 2.35rem);
	font-weight: 700;
	line-height: 1.2;
	color: #6b1028;
	margin-bottom: 0.65rem;
}

.countdown-heading-script {
	display: inline-block;
	font-size: clamp(2rem, 7vw, 2.85rem);
	font-weight: 600;
	margin-left: 0.12em;
	vertical-align: middle;
	line-height: 1;
}

.countdown-heading-heart {
	display: inline-block;
	margin-left: 0.12em;
	font-size: 0.85em;
	color: rgba(232, 180, 184, 0.95);
	vertical-align: middle;
}

.countdown-date {
	font-size: clamp(0.95rem, 3vw, 1.125rem);
	font-weight: 600;
	letter-spacing: 0.05em;
	color: #9f1239;
	margin: 0 auto 0.65rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	flex-wrap: wrap;
}

.countdown-date-gem {
	font-size: 0.55rem;
	color: #d4a574;
}

.countdown-copy {
	font-size: clamp(0.9rem, 2.8vw, 1.05rem);
	font-weight: 400;
	line-height: 1.65;
	color: rgba(76, 29, 42, 0.82);
	max-width: 34rem;
	margin: 0 auto 1.75rem;
}

.countdown-shell {
	position: relative;
	display: inline-block;
	max-width: 100%;
	padding: 1rem 0.85rem 0.95rem;
	border-radius: 1.5rem;
	border: 1px solid rgba(212, 165, 116, 0.45);
	background: linear-gradient(
		155deg,
		rgba(255, 255, 255, 0.82) 0%,
		rgba(255, 247, 249, 0.72) 50%,
		rgba(255, 240, 245, 0.78) 100%
	);
	box-shadow:
		0 22px 50px -18px rgba(136, 19, 57, 0.14),
		inset 0 1px 0 rgba(255, 255, 255, 0.95),
		0 0 28px -6px rgba(251, 207, 232, 0.45);
	backdrop-filter: blur(16px);
	-webkit-backdrop-filter: blur(16px);
}

.countdown-shell::before {
	content: "";
	position: absolute;
	inset: 5px;
	border-radius: 1.25rem;
	border: 1px solid rgba(255, 255, 255, 0.55);
	box-shadow: inset 0 0 0 1px rgba(212, 165, 116, 0.15);
	pointer-events: none;
}

@media (min-width: 640px) {
	.countdown-shell {
		padding: 1.2rem 1.15rem 1.05rem;
	}
}

.countdown-shell-heart {
	position: absolute;
	font-size: 0.45rem;
	color: rgba(212, 165, 116, 0.75);
	pointer-events: none;
	z-index: 2;
}

.countdown-shell-heart--left {
	top: 50%;
	left: 0.55rem;
	transform: translateY(-50%);
}

.countdown-shell-heart--right {
	top: 50%;
	right: 0.55rem;
	transform: translateY(-50%);
}

.countdown-shell-heart--bottom {
	bottom: 0.4rem;
	left: 50%;
	transform: translateX(-50%);
	color: rgba(136, 19, 57, 0.35);
}

.flip-clock-scroll {
	position: relative;
	z-index: 1;
	overflow-x: auto;
	scrollbar-width: none;
	-webkit-overflow-scrolling: touch;
}

.flip-clock-scroll::-webkit-scrollbar {
	display: none;
}

.flip-clock-digits {
	display: inline-flex;
	flex-wrap: nowrap;
	align-items: flex-start;
	justify-content: center;
	gap: 0.15rem;
	min-width: min(100%, max-content);
	padding: 0 0.35rem;
}

@media (min-width: 640px) {
	.flip-clock-digits {
		gap: 0.28rem;
		padding: 0 0.45rem;
	}
}

.flip-separator {
	flex-shrink: 0;
	align-self: flex-start;
	height: var(--flip-h, 2.75rem);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.32rem;
	padding: 0 0.08rem;
}

.flip-separator i {
	display: block;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: linear-gradient(145deg, #e8c896, #c9956c);
	box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.55);
}

@media (min-width: 640px) {
	.flip-separator {
		height: var(--flip-h, 3.25rem);
		gap: 0.4rem;
	}
}

@media (prefers-reduced-motion: reduce) {
	.countdown-petal {
		animation: none;
	}
}
</style>
