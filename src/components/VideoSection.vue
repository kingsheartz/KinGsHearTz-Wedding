<script setup lang="ts">
import { ref } from "vue"
import saveTheDateVideo from "../assets/videos/save_the_date.mp4"

const isPlaying = ref(false)

const onPlay = () => {
	isPlaying.value = true
}
const onPause = () => {
	isPlaying.value = false
}
</script>

<template>
	<section id="video" class="relative z-10 py-20 sm:py-24 bg-white isolate">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
			<h2
				class="text-3xl sm:text-4xl font-romantic text-rose-700 mb-4"
				data-aos="fade-up"
			>
				Save the Date
			</h2>
			<p class="text-gray-600 mb-10 mx-auto" data-aos="fade-up" data-aos-delay="80">
				Save the date for our wedding!
			</p>

			<div
				class="video-frame group relative rounded-3xl overflow-hidden border border-rose-100 bg-black shadow-[0_24px_60px_rgba(244,63,94,0.18)] transition-transform duration-500 hover:scale-[1.01]"
				data-aos="fade-up"
			>
				<div
					class="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-rose-400/30 via-transparent to-amber-300/25 z-10"
				/>
				<div class="aspect-video relative">
					<video
						class="w-full h-full object-contain bg-black relative z-0"
						:class="{ 'ring-2 ring-rose-400/40 ring-inset': isPlaying }"
						:src="saveTheDateVideo"
						controls
						playsinline
						preload="metadata"
						title="Save the Date"
						@play="onPlay"
						@pause="onPause"
					>
						Your browser does not support embedded video.
					</video>
				</div>
			</div>

			<div class="mt-8 space-y-1" data-aos="fade-up" data-aos-delay="120">
				<p class="font-romantic text-xl sm:text-2xl text-rose-800">Govind &amp; Krishnendu</p>
				<p class="text-sm sm:text-base text-gray-600">Thrissur, Kerala</p>
				<p class="text-sm sm:text-base text-gray-600">09 January 2027</p>
			</div>
		</div>
	</section>
</template>
