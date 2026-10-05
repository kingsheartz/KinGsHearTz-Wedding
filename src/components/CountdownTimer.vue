<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import launchFireworks from "./Fireworks"
import CountdownUnit from "./CountdownUnit.vue"

const weddingDate = new Date("2027-01-09T00:00:00")
const startDate = new Date("2026-01-01T00:00:00")

const days = ref("00")
const hours = ref("00")
const minutes = ref("00")
const seconds = ref("00")
const isWeddingDay = ref(false)

let timerId: number | undefined

const progressToWedding = computed(() => {
	const now = Date.now()
	const total = weddingDate.getTime() - startDate.getTime()
	const elapsed = now - startDate.getTime()
	if (total <= 0) return 100
	return Math.min(100, Math.max(0, (elapsed / total) * 100))
})

const updateTime = () => {
	const diff = weddingDate.getTime() - new Date().getTime()

	if (diff <= 0) {
		if (!isWeddingDay.value) launchFireworks()
		isWeddingDay.value = true
		days.value = "00"
		hours.value = "00"
		minutes.value = "00"
		seconds.value = "00"
		if (timerId) clearInterval(timerId)
		return
	}

	const d = Math.floor(diff / (1000 * 60 * 60 * 24))
	const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
	const m = Math.floor((diff / (1000 * 60)) % 60)
	const s = Math.floor((diff / 1000) % 60)

	days.value = d.toString().padStart(2, "0")
	hours.value = h.toString().padStart(2, "0")
	minutes.value = m.toString().padStart(2, "0")
	seconds.value = s.toString().padStart(2, "0")
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
	<section id="countdown" class="relative z-10 py-20 sm:py-24 overflow-hidden bg-mesh-light isolate">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
			<p
				class="uppercase tracking-[0.25em] text-xs text-rose-400 mb-2"
				data-aos="fade-up"
			>
				Save the date
			</p>
			<h2
				class="font-romantic text-3xl sm:text-4xl text-rose-700 mb-4"
				data-aos="fade-up"
				data-aos-delay="80"
			>
				Countdown to Our Forever
			</h2>
			<p class="text-gray-600 mb-10 mx-auto" data-aos="fade-up" data-aos-delay="120">
				We can’t wait to say “I do”. Until then, every second brings us closer to celebrating with you.
			</p>

			<div v-if="!isWeddingDay"
				class="inline-flex flex-wrap justify-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-3xl border border-rose-100/90 bg-white/75 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
				data-aos="zoom-in" data-aos-delay="180">
				<CountdownUnit :value="days" label="Days" />
				<CountdownUnit :value="hours" label="Hours" />
				<CountdownUnit :value="minutes" label="Minutes" />
				<CountdownUnit :value="seconds" label="Seconds" />
			</div>

			<div
				v-else
				class="mt-4 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-rose-500 text-white shadow-lg shadow-rose-400/60"
				data-aos="zoom-in"
			>
				<span class="text-lg font-medium">Today is the big day!</span>
			</div>

			<div class="mt-10 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="260">
				<div class="flex justify-between text-[10px] uppercase tracking-wider text-rose-400 mb-2">
					<span>Journey</span>
					<span>{{ progressToWedding.toFixed(0) }}%</span>
				</div>
				<div class="h-1.5 rounded-full bg-rose-100 overflow-hidden">
					<div
						class="h-full rounded-full bg-gradient-to-r from-rose-400 to-amber-400 transition-[width] duration-1000 ease-out"
						:style="{ width: `${progressToWedding}%` }" />
				</div>
			</div>
		</div>
	</section>
</template>
