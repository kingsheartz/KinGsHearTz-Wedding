<script setup lang="ts">

import { onMounted } from "vue"

onMounted(()=>{

document.addEventListener("mousemove",(e)=>{

const sparkle=document.createElement("div")

sparkle.className="sparkle"

sparkle.style.left=e.pageX+"px"
sparkle.style.top=e.pageY+"px"

document.body.appendChild(sparkle)

setTimeout(()=>sparkle.remove(),600)

})

})

</script>

<template></template>

<style>

.sparkle{

position:absolute;
width:6px;
height:6px;
background:gold;
border-radius:50%;
pointer-events:none;
animation:sparkle 0.6s linear;

}

@keyframes sparkle{

0%{transform:scale(1);opacity:1;}
100%{transform:scale(3);opacity:0;}

}

</style>