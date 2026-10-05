<script setup lang="ts">
defineProps<{
	eyebrow?: string
	title: string
	subtitle?: string
	dark?: boolean
}>()
</script>

<template>
	<div class="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
		<div class="flex items-center justify-center gap-3 mb-4">
			<span class="h-px w-12 sm:w-16" :class="dark ? 'bg-rose-400/30' : 'bg-rose-300/70'" />
			<span class="text-sm" :class="dark ? 'text-rose-300/80' : 'text-rose-400'">✦</span>
			<span class="h-px w-12 sm:w-16" :class="dark ? 'bg-rose-400/30' : 'bg-rose-300/70'" />
		</div>
		<p
			v-if="eyebrow"
			class="uppercase tracking-[0.28em] text-[10px] sm:text-xs mb-2"
			:class="dark ? 'text-rose-300/75' : 'text-rose-500/90'"
		>
			{{ eyebrow }}
		</p>
		<h2
			class="text-3xl sm:text-4xl lg:text-[2.65rem] font-romantic leading-tight mb-3"
			:class="dark ? 'text-rose-50' : 'text-rose-800'"
		>
			{{ title }}
		</h2>
		<p
			v-if="subtitle"
			class="text-sm sm:text-base leading-relaxed"
			:class="dark ? 'text-zinc-400' : 'text-gray-600'"
		>
			{{ subtitle }}
		</p>
	</div>
</template>
