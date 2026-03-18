<script setup lang="ts">
const events = [
  { year: "2018", title: "When We Met", text: "Two paths crossed and a beautiful story began." },
  { year: "2021", title: "First Trip", text: "We discovered new places and fell deeper in love." },
  { year: "2026", title: "Engagement", text: "A promise made, surrounded by our loved ones." },
  { year: "2027", title: "Wedding", text: "The day we become one, forever." }
];
</script>

<template>
  <section id="story" class="py-20 bg-rose-50/60">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-romantic text-center text-rose-700 mb-4">
        Our Journey Together
      </h2>
      <p class="text-center text-gray-600 mx-auto mb-12">
        Every moment brought us closer to this day. Here are a few milestones from our love story.
      </p>

      <div class="relative">
        <!-- vertical line -->
        <div class="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-rose-200/80"></div>

        <div class="space-y-10">
          <div
            v-for="(e, index) in events"
            :key="e.year"
            class="relative flex flex-col sm:flex-row items-center"
          >
            <!-- Connector dot -->
            <div
              class="hidden sm:flex items-center justify-center absolute left-1/2 -translate-x-1/2"
            >
              <div class="w-4 h-4 rounded-full bg-white border-2 border-rose-400 shadow-md"></div>
            </div>

            <!-- Card -->
            <div
              :class="[
                'w-full sm:w-1/2',
                index % 2 === 0
                  ? 'sm:pr-10 sm:text-right sm:ml-0 sm:mr-auto'
                  : 'sm:pl-10 sm:text-left sm:mr-0 sm:ml-auto'
              ]"
            >
              <div
                class="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg shadow-rose-100 px-6 py-5 border border-white/70"
              >
                <p class="text-rose-500 text-sm font-semibold tracking-wide">{{ e.year }}</p>
                <h3 class="mt-1 text-lg font-semibold text-gray-800">{{ e.title }}</h3>
                <p class="mt-2 text-sm text-gray-600">
                  {{ e.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
