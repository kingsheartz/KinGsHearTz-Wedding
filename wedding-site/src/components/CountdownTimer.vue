<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import launchFireworks from "./Fireworks"

const weddingDate = new Date("2027-01-09T10:30:00")

const days = ref("00")
const hours = ref("00")
const minutes = ref("00")
const seconds = ref("00")
const isWeddingDay = ref(false)

let timerId: number | undefined

const updateTime = () => {
  const diff = weddingDate.getTime() - new Date().getTime()

  if (diff <= 0) {
    if (!isWeddingDay.value) {
      launchFireworks()
    }
    isWeddingDay.value = true
    days.value = "00"
    hours.value = "00"
    minutes.value = "00"
    seconds.value = "00"
    if (timerId) {
      clearInterval(timerId)
    }
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
  <section class="py-20 bg-gradient-to-b from-rose-50 via-white to-rose-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <p class="uppercase tracking-[0.25em] text-xs text-rose-400 mb-2">
        Save the date
      </p>
      <h2 class="text-3xl sm:text-4xl font-romantic text-rose-700 mb-4 text-center">
        Countdown to Our Forever
      </h2>
      <p class="text-gray-600 mb-10 mx-auto">
        We can’t wait to say “I do”. Until then, every second brings us closer to celebrating with
        you.
      </p>

      <div
        v-if="!isWeddingDay"
        class="inline-flex items-stretch gap-3 sm:gap-4 bg-white/70 backdrop-blur-md px-4 sm:px-6 py-4 rounded-3xl shadow-[0_18px_45px_rgba(244,114,182,0.22)] border border-rose-100"
      >
        <div
          v-for="unit in [
            { label: 'Days', value: days },
            { label: 'Hours', value: hours },
            { label: 'Minutes', value: minutes },
            { label: 'Seconds', value: seconds }
          ]"
          :key="unit.label"
          class="flex flex-col items-center min-w-[70px] sm:min-w-[90px]"
        >
          <div
            class="text-2xl sm:text-3xl font-semibold text-rose-700 bg-rose-50 rounded-2xl px-4 py-3 shadow-inner"
          >
            {{ unit.value }}
          </div>
          <span class="mt-2 text-[11px] uppercase tracking-[0.18em] text-rose-400">
            {{ unit.label }}
          </span>
        </div>
      </div>

      <div
        v-else
        class="mt-4 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-rose-500 text-white shadow-lg shadow-rose-400/60"
      >
        <span class="text-lg font-medium">Today is the big day!</span>
      </div>
    </div>
  </section>
</template>
