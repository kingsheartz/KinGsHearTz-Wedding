import { createApp } from "vue";
import App from "./App.vue";
import "./assets/theme.css";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);

AOS.init({
	duration: 850,
	easing: "ease-out-cubic",
	once: true,
	offset: 64,
	disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

window.addEventListener("load", () => AOS.refresh());

app.mount("#app");
