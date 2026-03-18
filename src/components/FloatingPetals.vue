<template>

	<div class="petals">

		<span v-for="i in 20" :key="i"></span>

	</div>

</template>

<style>
.petals span {
	position: absolute;
	width: 15px;
	height: 15px;
	background: pink;
	border-radius: 50%;
	opacity: 0.7;
	animation: fall 10s linear infinite;
}

@keyframes fall {
	0% {
		transform: translateY(-10vh);
	}

	100% {
		transform: translateY(110vh);
	}
}
</style>