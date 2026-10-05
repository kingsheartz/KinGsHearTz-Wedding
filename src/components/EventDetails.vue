<script setup lang="ts">
import SectionHeading from "./SectionHeading.vue"

const events = [
	{
		title: "Temple Ceremony",
		time: "8:00 AM – 9:00 AM",
		date: "Jan 9, 2027 · Saturday",
		place: "Kaladi Shiva Temple, Meloor",
		icon: "🛕",
	},
	{
		title: "Wedding Venue",
		time: "11:00 AM – 1:30 PM",
		date: "Jan 9, 2027 · Saturday",
		place: "MSC convention centre, Meloor",
		icon: "💍",
	},
	{
		title: "Reception",
		time: "5:00 PM – 9:00 PM",
		date: "Jan 9, 2027 · Saturday",
		place: "Anugraha Parish Hall, Mannampetta",
		icon: "✨",
	},
]
</script>

<template>
	<section id="events" class="relative py-20 sm:py-24 px-4 sm:px-6 bg-[#16171d] overflow-hidden">
		<div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(244,63,94,0.12),transparent_45%)]" />
		<div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_100%,rgba(251,191,36,0.06),transparent_40%)]" />

		<div class="relative max-w-6xl mx-auto">
			<SectionHeading
				dark
				eyebrow="Schedule"
				title="Celebration Timeline"
				subtitle="Three cherished moments of our wedding day."
			/>

			<div class="grid md:grid-cols-3 gap-6 lg:gap-8">
				<div
					v-for="event in events"
					:key="event.title"
					class="group rounded-2xl border border-zinc-700/60 bg-zinc-900/50 backdrop-blur-md shadow-xl shadow-black/25 px-8 py-8 text-left transition hover:border-rose-500/35 hover:-translate-y-1"
				>
					<div
						class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-400/20 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition"
					>
						{{ event.icon }}
					</div>
					<h3 class="text-2xl font-romantic text-rose-200">{{ event.title }}</h3>
					<p class="mt-3 text-sm text-rose-300/80">{{ event.date }}</p>
					<p class="mt-2 text-zinc-200 font-medium">{{ event.time }}</p>
					<p class="text-zinc-400 text-sm mt-3 leading-relaxed">{{ event.place }}</p>
				</div>
			</div>
		</div>
	</section>
</template>
