<script setup lang="ts">
import photo1 from "../assets/photos/1.jpg"
import photo2 from "../assets/photos/2.jpg"
import photo3 from "../assets/photos/3.jpg"

const photos = [photo1, photo2, photo3]
</script>

<template>

	<section id="gallery" class="py-24 bg-white">

		<div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">

			<h2 class="text-3xl sm:text-4xl font-romantic text-center text-rose-700 mb-3">
				Memories in Frames
			</h2>

			<p class="text-gray-700 mb-10 mx-auto max-w-2xl">
				A few moments from our journey together — from quiet smiles to shared laughter.
			</p>

			<div
				class="grid gap-5 sm:gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] sm:auto-rows-[320px] md:auto-rows-[360px]">
				<div v-for="(p, idx) in photos" :key="idx"
					class="group relative rounded-3xl overflow-hidden shadow-xl shadow-rose-200/70 border border-rose-100/80 bg-rose-50/60 flex">
					<img :src="p"
						class="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105"
						loading="eager"
						:alt="`Our moment ${idx + 1}`" />

					<!-- Very light gradient only at bottom edge so faces stay clear -->
					<div
						class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

					<div class="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] sm:text-xs">
						<span class="px-2.5 py-1 rounded-full bg-black/50 text-rose-50 backdrop-blur-sm">
							Our Moment
						</span>
						<span class="px-2.5 py-1 rounded-full bg-black/40 text-rose-50 backdrop-blur-sm">
							{{ idx + 1 }} / {{ photos.length }}
						</span>
					</div>
				</div>
			</div>

		</div>

	</section>

</template>