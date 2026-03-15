<template>

<section class="parallax story1">
<div class="content">

<h2>How We Met</h2>

<p>Our journey began in 2018...</p>

</div>
</section>

<section class="parallax story2">
<div class="content">

<h2>The Proposal</h2>

<p>Under the sunset sky...</p>

</div>
</section>

</template>

<style>

.parallax{
height:100vh;
background-attachment:fixed;
background-size:cover;
display:flex;
align-items:center;
justify-content:center;
}

.story1{
background-image:url("/photos/story1.jpg");
}

.story2{
background-image:url("/photos/story2.jpg");
}

.content{
background:rgba(255,255,255,0.8);
padding:40px;
border-radius:10px;
}

</style>