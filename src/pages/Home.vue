<script setup lang="ts">

import SiteHeader from "../components/SiteHeader.vue"
import HeroSection from "../components/HeroSection.vue"
import CountdownTimer from "../components/CountdownTimer.vue"
import StoryTimeline from "../components/StoryTimeline.vue"
import StoryParallax from "../components/StoryParallax.vue"
import EventDetails from "../components/EventDetails.vue"
import FloatingPetals from "../components/FloatingPetals.vue"
import GallerySlider from "../components/GallerySlider.vue"
import VideoSection from "../components/VideoSection.vue"
import RSVPForm from "../components/RSVPForm.vue"
import WhatsAppRSVP from "../components/WhatsAppRSVP.vue"
import GoogleMapVenue from "../components/GoogleMapVenue.vue"
import BackgroundMusic from "../components/BackgroundMusic.vue"
</script>

<template>
	<BackgroundMusic />

	<SiteHeader />

	<HeroSection />

	<CountdownTimer />

	<StoryTimeline />

	<StoryParallax />

	<VideoSection />

	<GallerySlider />

	<EventDetails />

	<FloatingPetals />

	<GoogleMapVenue />

	<RSVPForm />

	<WhatsAppRSVP />
</template>
