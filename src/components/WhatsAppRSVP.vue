<script setup lang="ts">
const phone = "918113990368"

const openWA = () => {
	window.open(`https://wa.me/${phone}`)
}
</script>

<template>
	<div class="text-center py-14 px-4 bg-[#16171d] border-t border-zinc-800/80">
		<p class="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4">Prefer a quick message?</p>
		<button
			type="button"
			class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-3.5 text-sm font-medium shadow-lg shadow-emerald-950/35 transition hover:-translate-y-0.5"
			@click="openWA"
		>
			RSVP via WhatsApp
		</button>
	</div>
</template>
