import { ref } from "vue"
import { useRafScroll } from "./useRafScroll"

export function useScrollProgress() {
	const progress = ref(0)

	useRafScroll(() => {
		const doc = document.documentElement
		const scrollable = doc.scrollHeight - doc.clientHeight
		progress.value = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0
	})

	return { progress }
}
