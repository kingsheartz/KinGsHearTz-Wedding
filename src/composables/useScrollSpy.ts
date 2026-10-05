import { ref, onMounted, onBeforeUnmount } from "vue"

export function useScrollSpy(sectionIds: string[]) {
	const activeId = ref<string | null>(null)

	let observer: IntersectionObserver | undefined

	onMounted(() => {
		const elements = sectionIds
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => Boolean(el))

		if (!elements.length) return

		observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
				if (visible?.target.id) {
					activeId.value = visible.target.id
				}
			},
			{ rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
		)

		for (const el of elements) observer.observe(el)
	})

	onBeforeUnmount(() => observer?.disconnect())

	return { activeId }
}
