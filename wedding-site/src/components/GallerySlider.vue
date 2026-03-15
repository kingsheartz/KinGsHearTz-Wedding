<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"

import photo1 from "../assets/photos/1.jpg"
import photo2 from "../assets/photos/2.jpg"
import photo3 from "../assets/photos/3.jpg"

const photos = [photo1, photo2, photo3]
</script>

<template>

	<section class="py-20">

		<Swiper>

			<SwiperSlide v-for="p in photos">
				<img :src="p" class="rounded-xl shadow-lg hover:scale-105 transition duration-300" />
			</SwiperSlide>

		</Swiper>

	</section>

</template>