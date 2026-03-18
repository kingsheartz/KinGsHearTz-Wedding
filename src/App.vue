<script setup lang="ts">
import { ref } from "vue"
import Home from "./pages/Home.vue"
import SparkleCursor from "./components/SparkleCursor.vue"
import FloatingFlowers from "./components/FloatingFlowers.vue"
import InvitationEnvelope from "./components/InvitationEnvelope.vue"
import InvitationEnvelopeDark from "./components/InvitationEnvelopeDark.vue"

const showIntro = ref(true)

// Reactive system dark mode detection (no extra dependencies)
const isDark = ref(window.matchMedia("(prefers-color-scheme: dark)").matches)
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  isDark.value = e.matches
})

function onEnter() {
  showIntro.value = false
}
</script>

<template>
  <InvitationEnvelopeDark v-if="showIntro && isDark" @enter="onEnter" />
  <InvitationEnvelope v-else-if="showIntro && !isDark" @enter="onEnter" />

  <template v-else>
    <Home />
    <SparkleCursor />
    <FloatingFlowers />
  </template>
</template>