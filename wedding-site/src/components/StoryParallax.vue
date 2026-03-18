<script setup lang="ts">
const stories = [
  {
    id: "met",
    title: "How We Met",
    subtitle: "Our journey began in 2018",
    text: "Two hearts, one serendipitous moment. What started as a simple hello became the beginning of our forever.",
    bg: "linear-gradient(135deg, rgba(190, 18, 60, 0.75) 0%, rgba(136, 19, 55, 0.85) 100%)"
  },
  {
    id: "proposal",
    title: "The Proposal",
    subtitle: "Under the sunset sky",
    text: "A promise made with the golden hour as our witness. That day we said yes to a lifetime of adventures together.",
    bg: "linear-gradient(135deg, rgba(157, 23, 77, 0.8) 0%, rgba(136, 19, 55, 0.9) 100%)"
  }
]
</script>

<template>
  <section
    v-for="story in stories"
    :key="story.id"
    class="parallax flex items-center justify-center min-h-screen py-20"
    :style="{
      background: story.bg,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <div
      class="content max-w-xl mx-4 rounded-3xl px-8 py-10 sm:px-12 sm:py-14 text-center shadow-2xl border border-white/20"
      style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px);"
    >
      <p class="text-xs uppercase tracking-[0.35em] text-rose-500 mb-2">{{ story.subtitle }}</p>
      <h2 class="text-2xl sm:text-3xl font-romantic text-rose-800 mb-4">{{ story.title }}</h2>
      <p class="text-gray-600 leading-relaxed">{{ story.text }}</p>
    </div>
  </section>
</template>

<style scoped>
.parallax {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
</style>
