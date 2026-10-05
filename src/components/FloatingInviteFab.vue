<script setup lang="ts">
import { showInvitation } from "../state"
</script>

<template>
	<button
		type="button"
		class="invite-fab fixed bottom-6 right-4 sm:right-6 z-30 flex items-center gap-2 rounded-full border border-rose-200/40 bg-rose-500/95 px-4 py-3 text-white text-xs sm:text-sm font-medium shadow-[0_12px_40px_rgba(244,63,94,0.45)] backdrop-blur-md transition hover:scale-[1.03] hover:bg-rose-600 active:scale-[0.98]"
		@click="showInvitation = true"
	>
		<svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
			/>
		</svg>
		<span class="hidden sm:inline">View Invitation</span>
		<span class="sm:hidden">Invitation</span>
	</button>
</template>

<style scoped>
.invite-fab {
	max-width: calc(100vw - 2rem);
}
</style>
