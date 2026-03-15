<template>
  <section class="py-20 bg-white">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
      <h2 class="text-3xl sm:text-4xl font-romantic text-rose-700 mb-4">
        Our Love Story Film
      </h2>
      <p class="text-gray-600 mb-10 max-w-2xl mx-auto">
        A glimpse into our journey, the laughter we shared, and the moments that led us to this
        beautiful day.
      </p>

      <div
        class="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/70 border border-rose-100 bg-black"
      >
        <div class="aspect-video">
          <iframe
            class="w-full h-full"
            src="https://www.youtube.com/embed/YOUTUBE_ID"
            title="Our Love Story"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <!-- soft overlay edges -->
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"
        ></div>
      </div>
    </div>
  </section>
</template>
