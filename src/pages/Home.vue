<script setup lang="ts">
import { onMounted, nextTick } from "vue"
import AOS from "aos"

import SiteHeader from "../components/SiteHeader.vue"
import ScrollProgressBar from "../components/ScrollProgressBar.vue"
import HeroSection from "../components/HeroSection.vue"
import DateMarquee from "../components/DateMarquee.vue"
import CountdownTimer from "../components/CountdownTimer.vue"
import StoryTimeline from "../components/StoryTimeline.vue"
import EventDetails from "../components/EventDetails.vue"
import GallerySlider from "../components/GallerySlider.vue"
import VideoSection from "../components/VideoSection.vue"
import RSVPForm from "../components/RSVPForm.vue"
import WhatsAppRSVP from "../components/WhatsAppRSVP.vue"
import GoogleMapVenue from "../components/GoogleMapVenue.vue"
import BackgroundMusic from "../components/BackgroundMusic.vue"
import SiteFooter from "../components/SiteFooter.vue"
import FloatingInviteFab from "../components/FloatingInviteFab.vue"

onMounted(async () => {
	await nextTick()
	requestAnimationFrame(() => AOS.refresh())
})
</script>

<template>
	<ScrollProgressBar />

	<BackgroundMusic />

	<SiteHeader />

	<HeroSection />

	<DateMarquee />

	<CountdownTimer />

	<StoryTimeline />

	<VideoSection />

	<GallerySlider />

	<EventDetails />

	<GoogleMapVenue />

	<RSVPForm />

	<WhatsAppRSVP />

	<SiteFooter />

	<FloatingInviteFab />
</template>
