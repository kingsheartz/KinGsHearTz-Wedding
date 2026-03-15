<script setup lang="ts">

const phone="919876543210"

const openWA=()=>{

window.open(`https://wa.me/${phone}`)

}
</script>

<template>
  <div class="text-center py-10">
    <button @click="openWA" class="bg-green-500 text-white px-6 py-3 rounded">
      RSVP via WhatsApp
    </button>
  </div>
</template>
