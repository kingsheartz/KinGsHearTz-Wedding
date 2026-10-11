import { onBeforeUnmount, onMounted } from "vue"

/** Fixed header clearance when scrolling to #sections */
export const SECTION_SCROLL_OFFSET = 88

/** Legacy / friendly hash aliases → element id */
const HASH_ALIASES: Record<string, string> = {
	rsvp: "rsvp",
	"rsvp-section": "rsvp",
	venue: "venue-map",
	map: "venue-map",
	locations: "venue-map",
	home: "hero",
}

export function resolveSectionId(rawHash: string): string | null {
	const id = rawHash.replace(/^#/, "").trim().toLowerCase()
	if (!id) return null
	return HASH_ALIASES[id] ?? id
}

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth"): boolean {
	const el = document.getElementById(id)
	if (!el) return false

	const top = el.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET
	window.scrollTo({ top: Math.max(0, top), behavior })

	const hash = `#${id}`
	if (window.location.hash !== hash) {
		history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`)
	}
	return true
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth"): boolean {
	const id = resolveSectionId(hash)
	if (!id) return false
	return scrollToSection(id, behavior)
}

/** Retry until section exists (post-intro / lazy mount). */
export function scrollToHashWhenReady(
	hash: string,
	behavior: ScrollBehavior = "smooth",
	maxAttempts = 40,
	intervalMs = 50,
): void {
	const id = resolveSectionId(hash)
	if (!id) return

	let attempts = 0
	const tryScroll = () => {
		if (scrollToSection(id, behavior)) return
		attempts += 1
		if (attempts < maxAttempts) {
			window.setTimeout(tryScroll, intervalMs)
		}
	}
	tryScroll()
}

/** Listen for #hash links and scroll after the page shell is visible */
export function useHashNavigation(isActive: () => boolean) {
	const onHashChange = () => {
		if (!isActive()) return
		scrollToHashWhenReady(window.location.hash, "smooth")
	}

	onMounted(() => {
		if (isActive() && window.location.hash) {
			scrollToHashWhenReady(window.location.hash, "auto")
		}
		window.addEventListener("hashchange", onHashChange)
	})

	onBeforeUnmount(() => {
		window.removeEventListener("hashchange", onHashChange)
	})
}
