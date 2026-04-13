<script setup lang="ts">
import { computed, ref } from "vue"

/** Kerala wedding flow: thalikettu at temple → kalyanam at hall → sandhya reception. Replace embed URLs if pins move. */
const locations = [
  {
    id: "thalikettu",
    pill: "Thalikettu",
    title: "Temple Ceremony",
    place: "Sree Melur Shiva Temple, Melur",
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d977.6609042871575!2d75.70793069611862!3d11.433392281409377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba68a05db8b58a9%3A0xd3eda209fb24a0cc!2sSree%20Melur%20Shiva%20Temple!5e0!3m2!1sen!2sin!4v1773604655809!5m2!1sen!2sin",
  },
  {
    id: "kalyanam",
    pill: "Kalyanam",
    title: "Wedding Venue",
    place: "MSC convention centre, Melur",
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22855.745463408264!2d76.36170676566762!3d10.314500158447249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080196c8164d5b%3A0x1b77b47948227284!2sMSC%20convention%20centre!5e0!3m2!1sen!2sin!4v1776109254653!5m2!1sen!2sin",
  },
  {
    id: "vivaahasalkkaram",
    pill: "Vivaahasalkkaram",
    title: "Wedding Reception",
    place: "Anugraha Parish Hall, Mannampetta",
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1961.9560002467504!2d76.2914633162632!3d10.428557710022123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7fa15e679ea77%3A0xf4d94274c241b16!2sAnugraha%20Parish%20Hall%20Mannampetta!5e0!3m2!1sen!2sin!4v1776109361153!5m2!1sen!2sin",
  },
] as const

const activeIndex = ref(0)
const active = computed(() => locations[activeIndex.value])

function selectLocation(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <section id="venue-map" class="py-16 sm:py-20 px-4 sm:px-6 text-center bg-[#16171d] border-t border-zinc-800/80">
    <p class="uppercase tracking-[0.25em] text-[10px] text-rose-300/70 mb-2">Where &amp; when</p>
    <h2 class="text-2xl sm:text-3xl font-romantic text-rose-200/95 mb-2">Locations</h2>
    <!--
    <p class="text-sm text-zinc-400 max-w-xl mx-auto mb-8">
      Thalikettu at the temple, kalyanam at the hall, and vivaahasalkkaram (reception) — three moments of our Kerala wedding.
    </p>
    -->

    <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 max-w-3xl mx-auto">
      <button
        v-for="(loc, i) in locations"
        :key="loc.id"
        type="button"
        class="rounded-full px-4 py-2 text-left transition border text-xs sm:text-sm min-w-0 sm:min-w-[140px]"
        :class="
          activeIndex === i
            ? 'bg-rose-500/25 border-rose-400/50 text-rose-100 shadow-lg shadow-rose-900/30'
            : 'bg-zinc-900/80 border-zinc-700/80 text-zinc-400 hover:border-rose-500/35 hover:text-rose-200/90'
        "
        @click="selectLocation(i)"
      >
        <span class="block font-medium tracking-wide">{{ loc.pill }}</span>
        <span class="block text-[10px] sm:text-[11px] opacity-80 mt-0.5 truncate">{{ loc.title }}</span>
      </button>
    </div>

    <p class="text-sm text-rose-200/85 font-medium mb-3">{{ active.place }}</p>

    <div class="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-zinc-700/80 shadow-[0_24px_60px_rgba(0,0,0,0.45)] bg-zinc-900">
      <iframe
        :key="active.id"
        title="Wedding location map"
        width="100%"
        height="400"
        class="w-full min-h-[320px] sm:min-h-[400px] border-0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        :src="active.embed"
      />
    </div>
  </section>
</template>
