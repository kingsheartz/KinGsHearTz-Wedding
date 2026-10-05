<script setup lang="ts">
import saveTheDateVideo from "../assets/videos/save_the_date.mp4"
</script>

<template>
	<section class="py-20 bg-white">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
			<h2 class="text-3xl sm:text-4xl font-romantic text-rose-700 mb-4 text-center">
				Save the Date
			</h2>
			<p class="text-gray-600 mb-10 mx-auto">
				Save the date for our wedding!
			</p>

			<div class="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/70 border border-rose-100 bg-black">
				<div class="aspect-video">
					<video
						class="w-full h-full object-contain bg-black"
						:src="saveTheDateVideo"
						controls
						playsinline
						preload="metadata"
						title="Save the Date"
					>
						Your browser does not support embedded video.
					</video>
				</div>

				<!-- soft overlay edges -->
				<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10">
				</div>
			</div>
		</div>
	</section>
</template>
