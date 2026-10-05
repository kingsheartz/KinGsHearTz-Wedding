import { ref, onMounted, onBeforeUnmount } from "vue"

export function useScrollProgress() {
	const progress = ref(0)

	const update = () => {
		const doc = document.documentElement
		const scrollable = doc.scrollHeight - doc.clientHeight
		progress.value = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0
	}

	onMounted(() => {
		update()
		window.addEventListener("scroll", update, { passive: true })
		window.addEventListener("resize", update)
	})

	onBeforeUnmount(() => {
		window.removeEventListener("scroll", update)
		window.removeEventListener("resize", update)
	})

	return { progress }
}
