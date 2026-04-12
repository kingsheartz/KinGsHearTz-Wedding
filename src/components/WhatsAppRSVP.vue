<script setup lang="ts">

const phone="918113990368"

const openWA=()=>{

window.open(`https://wa.me/${phone}`)

}
</script>

<template>
  <div class="text-center py-12 bg-[#16171d] border-t border-zinc-800/80">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white px-8 py-3 text-sm font-medium shadow-lg shadow-emerald-900/30 transition"
      @click="openWA"
    >
      RSVP via WhatsApp
    </button>
  </div>
</template>
