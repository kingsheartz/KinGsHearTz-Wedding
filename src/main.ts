import { createApp } from "vue";
import App from "./App.vue";
import "./assets/theme.css";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
const isNarrowViewport = window.matchMedia("(max-width: 768px)").matches;

AOS.init({
	duration: 700,
	easing: "ease-out-cubic",
	once: true,
	offset: 60,
	anchorPlacement: "top-bottom",
	throttleDelay: 99,
	debounceDelay: 50,
	startEvent: "DOMContentLoaded",
	disable: prefersReducedMotion || prefersCoarsePointer || isNarrowViewport,
});

app.mount("#app");
