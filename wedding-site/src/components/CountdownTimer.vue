<script setup lang="ts">

import { ref, onMounted } from "vue"
import launchFireworks from "./Fireworks"

const weddingDate = new Date("2027-01-09T10:30:00")

const time = ref("")

onMounted(()=>{

setInterval(()=>{

const diff = weddingDate.getTime() - new Date().getTime()

if(diff <= 0){
launchFireworks()
time.value="The Big Day!"
return
}

const days = Math.floor(diff/(1000*60*60*24))
const hours = Math.floor((diff/(1000*60*60))%24)

time.value = `${days} days ${hours} hours`

},1000)

})
</script>

<template>
  <section class="text-center py-16">
    <h2 class="text-3xl mb-6">Countdown</h2>

    <p class="text-2xl">{{time}}</p>
  </section>
</template>
