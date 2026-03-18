<script setup lang="ts">
import { ref } from "vue"

const opened = ref(false)
const letterVisible = ref(false)
const exiting = ref(false)

function openInvite() {
  if (opened.value) return
  opened.value = true
  setTimeout(() => {
    letterVisible.value = true
  }, 600)
}

function enterWedding() {
  exiting.value = true
  setTimeout(() => {
    emit("enter")
  }, 800)
}

const emit = defineEmits<{ (e: "enter"): void }>()
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700"
    :class="exiting ? 'opacity-0 pointer-events-none' : ''"
    style="background: linear-gradient(165deg, #fef7f4 0%, #fce7f3 40%, #fbcfe8 100%);"
  >
    <!-- Subtle pattern overlay -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.04] pattern-diamond" />

    <!-- Hint text (before open) -->
    <p
      v-if="!opened"
      class="absolute top-[18%] z-10 text-sm tracking-[0.35em] uppercase text-rose-400/90 transition-opacity duration-300"
    >
      Click the envelope to open
    </p>

    <!-- Envelope + letter container -->
    <div class="relative flex items-center justify-center min-h-[420px] w-full max-w-lg px-6">
      <!-- Envelope body -->
      <div
        class="relative cursor-pointer select-none transition-transform duration-500 hover:scale-[1.02]"
        :class="opened ? 'scale-95 opacity-0 pointer-events-none' : ''"
        @click="openInvite"
      >
        <div
          class="envelope-body relative w-[320px] h-[200px] rounded-sm shadow-2xl"
          style="background: linear-gradient(145deg, #e11d48 0%, #be123c 50%, #9f1239 100%); box-shadow: 0 25px 50px -12px rgba(190, 18, 60, 0.35), inset 0 1px 0 rgba(255,255,255,0.2);"
        >
          <!-- Envelope flap (opens up) -->
          <div
            class="envelope-flap absolute inset-0 rounded-sm transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            :class="opened ? 'flap-open' : ''"
            style="
              background: linear-gradient(160deg, #f43f5e 0%, #e11d48 40%, #be123c 100%);
              box-shadow: 0 -2px 12px rgba(0,0,0,0.15);
              transform-origin: top center;
           "
          >
            <div
              class="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-sm opacity-90"
              style="background: linear-gradient(to top, #9f1239, transparent);"
            />
          </div>

          <!-- Envelope inner (visible when flap opens) -->
          <div
            class="absolute inset-2 rounded-sm opacity-95"
            style="background: linear-gradient(180deg, #fef2f2 0%, #fce7f3 100%);"
          />

          <!-- Seal -->
          <div
            v-if="!opened"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg tracking-wider shadow-lg border-2 border-white/40"
            style="background: linear-gradient(145deg, #f472b6, #ec4899);"
          >
            G & K
          </div>
        </div>
      </div>

      <!-- Letter (slides up after open) -->
      <div
        class="absolute inset-0 flex items-center justify-center px-6"
        :class="letterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'"
        style="transition: opacity 0.6s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);"
      >
        <div
          class="w-full max-w-md rounded-2xl px-8 py-10 text-center shadow-2xl border border-rose-100/80"
          style="background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fef7f4 100%); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(251, 113, 133, 0.1);"
        >
          <p class="text-xs tracking-[0.4em] uppercase text-rose-400 mb-2">You are invited</p>
          <p class="text-rose-600/90 text-sm mb-4">to celebrate the wedding of</p>
          <h1 class="font-romantic text-3xl sm:text-4xl text-rose-700 mb-2">Govind & Krishnendu</h1>
          <p class="text-rose-500/80 text-sm mb-8">25 March 2027 · Kochi</p>

          <button
            type="button"
            class="rounded-full px-8 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100"
            style="background: linear-gradient(145deg, #e11d48, #be123c); box-shadow: 0 4px 14px rgba(190, 18, 60, 0.45);"
            @click="enterWedding"
          >
            Enter our wedding
          </button>
        </div>
      </div>
    </div>

    <!-- Decorative line -->
    <div
      class="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-rose-300/70 text-xs tracking-widest"
    >
      <span class="w-12 h-px bg-rose-200/60 rounded" />
      <span>With love</span>
      <span class="w-12 h-px bg-rose-200/60 rounded" />
    </div>
  </div>
</template>

<style scoped>
.pattern-diamond {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%2393126f' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.envelope-body {
  perspective: 1200px;
  transform-style: preserve-3d;
}

.envelope-flap {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.flap-open {
  transform: rotateX(-180deg);
}
</style>
