<script setup lang="ts">
import { ref } from "vue"
import Home from "./pages/Home.vue"
import SparkleCursor from "./components/SparkleCursor.vue"
import FloatingFlowers from "./components/FloatingFlowers.vue"
import InvitationEnvelope from "./components/InvitationEnvelope.vue"

const showIntro = ref(true)

function onEnter() {
  showIntro.value = false
}
</script>

<template>
  <InvitationEnvelope v-if="showIntro" @enter="onEnter" />

  <template v-else>
    <Home />
    <SparkleCursor />
    <FloatingFlowers />
  </template>
</template>
