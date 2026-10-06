import { onMounted, onBeforeUnmount } from "vue"

/** Run a scroll/resize handler at most once per animation frame. */
export function useRafScroll(handler: () => void) {
	let ticking = false

	const onFrame = () => {
		ticking = false
		handler()
	}

	const schedule = () => {
		if (ticking) return
		ticking = true
		requestAnimationFrame(onFrame)
	}

	onMounted(() => {
		handler()
		window.addEventListener("scroll", schedule, { passive: true })
		window.addEventListener("resize", schedule)
	})

	onBeforeUnmount(() => {
		window.removeEventListener("scroll", schedule)
		window.removeEventListener("resize", schedule)
	})
}
