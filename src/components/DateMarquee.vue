<template>
	<div
		class="marquee-band relative overflow-hidden border-y border-rose-200/60 bg-[#0c0c0f] py-3 select-none"
		aria-hidden="true"
	>
		<div class="marquee-track flex w-max gap-10 whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.35em] text-rose-100/75">
			<span v-for="n in 2" :key="n" class="flex shrink-0 gap-10">
				<span v-for="item in items" :key="`${n}-${item}`" class="flex items-center gap-10">
					<span>{{ item }}</span>
					<span class="text-rose-400/60">✦</span>
				</span>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
const items = [
	"Govind & Krishnendu",
	"Save the date",
	"09 January 2027",
	"Thrissur",
	"Countdown to our forever",
]
</script>

<style scoped>
.marquee-track {
	animation: marquee 28s linear infinite;
}

@keyframes marquee {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-50%);
	}
}

@media (prefers-reduced-motion: reduce) {
	.marquee-track {
		animation: none;
	}
}
</style>
