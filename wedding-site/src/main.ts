import { createApp } from 'vue'
import App from './App.vue'
import "./assets/theme.css"
import './style.css'
import AOS from "aos"
import "aos/dist/aos.css"
import Particles from "@tsparticles/vue3"
import { loadFull } from "tsparticles"

const app = createApp(App)

app.use(Particles, {
  init: async (engine) => {
		AOS.init()
    await loadFull(engine)
  },
})

app.mount("#app")

