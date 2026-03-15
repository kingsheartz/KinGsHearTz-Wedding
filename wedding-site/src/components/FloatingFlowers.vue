<script setup lang="ts">
const options = {
  particles: {
    number: { value: 12 },
    shape: {
      type: "image",
      image: {
        src: "/flowers/rose.png",
        width: 32,
        height: 32
      }
    },
    move: {
      enable: true,
      speed: 1,
      direction: "bottom"
    },
    size: { value: 20 },
    opacity: { value: 0.8 }
  }
}
</script>

<template>
<Particles
id="flowers"
:options="options"
class="fixed top-0 left-0 w-full h-full pointer-events-none"
/>
</template>