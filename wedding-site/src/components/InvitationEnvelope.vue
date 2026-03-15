<script setup lang="ts">
import { ref } from "vue"

const opened = ref(false)

function openInvite(){
opened.value = true
}
</script>

<template>

<div class="invite-container">

<div
class="envelope"
:class="{open:opened}"
@click="openInvite"
>

<div class="flap"></div>

<div class="letter">

<h2>You Are Invited</h2>

<p>To the wedding of</p>

<h1>Arjun & Meera</h1>

</div>

</div>

</div>

</template>

<style>

.invite-container{
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.envelope{
width:300px;
height:200px;
position:relative;
background:#f43f5e;
cursor:pointer;
}

.flap{
position:absolute;
width:100%;
height:100%;
background:#be123c;
transform-origin:top;
transition:transform 0.6s;
}

.envelope.open .flap{
transform:rotateX(180deg);
}

.letter{
position:absolute;
background:white;
width:90%;
height:80%;
top:10%;
left:5%;
padding:20px;
text-align:center;
}

</style>