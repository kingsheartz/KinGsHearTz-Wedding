<script setup lang="ts">
defineProps<{
	value: string
	label: string
}>()
</script>

<template>
	<div class="countdown-unit flex flex-col items-center min-w-[72px] sm:min-w-[88px]">
		<div
			class="digit-panel relative w-full rounded-2xl border border-rose-100/80 bg-white/90 px-3 py-4 sm:px-4 sm:py-5 shadow-[0_8px_30px_rgba(244,63,94,0.12)] backdrop-blur-sm overflow-hidden group"
		>
			<div
				class="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-50/80 via-transparent to-amber-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
			/>
			<Transition name="tick" mode="out-in">
				<span
					:key="value"
					class="relative block text-3xl sm:text-4xl font-semibold text-rose-800 tabular-nums tracking-tight"
				>
					{{ value }}
				</span>
			</Transition>
		</div>
		<span class="mt-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-rose-400/90">
			{{ label }}
		</span>
	</div>
</template>

<style scoped>
.tick-enter-active {
	animation: tick-in 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.tick-leave-active {
	animation: tick-out 0.25s ease-in;
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
@keyframes tick-in {
	from {
		opacity: 0;
		transform: translateY(12px) scale(0.92);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}
@keyframes tick-out {
	from {
		opacity: 1;
		transform: translateY(0);
	}
	to {
		opacity: 0;
		transform: translateY(-10px);
	}
}
@media (prefers-reduced-motion: reduce) {
	.tick-enter-active,
	.tick-leave-active {
		animation: none;
	}
}
</style>
