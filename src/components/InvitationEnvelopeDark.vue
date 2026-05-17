<script setup lang="ts">
import { ref } from "vue"

const opened = ref(false)
const letterVisible = ref(false)
const exiting = ref(false)

function openInvite() {
	if (opened.value) return
	opened.value = true
	spawnPetals()
	setTimeout(() => {
		letterVisible.value = true
	}, 750)
}

function enterWedding() {
	exiting.value = true
	setTimeout(() => {
		emit("enter")
	}, 800)
}

function spawnPetals() {
	const stage = document.getElementById("inv-stage")
	if (!stage) return
	const colors = ["#d4a837", "#c8855a", "#e8c878", "rgba(212,168,55,0.6)", "#f0d08a", "#c9956a"]
	for (let i = 0; i < 26; i++) {
		const p = document.createElement("div")
		p.className = "inv-petal"
		const size = 4 + Math.random() * 9
		p.style.cssText = `
      position:absolute;
      border-radius:50% 0 50% 0;
      pointer-events:none;
      z-index:0;
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}%;
      top:${-10 - Math.random() * 40}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation:inv-fall ${2.5 + Math.random() * 2}s linear ${Math.random() * 0.8}s forwards;
    `
		stage.appendChild(p)
		setTimeout(() => p.remove(), 5000)
	}
}

const emit = defineEmits<{ (e: "enter"): void }>()
</script>

<template>
	<div id="inv-stage" class="inv-stage" :class="exiting ? 'inv-exiting' : ''">
		<!-- Background dot grid -->
		<div class="inv-dotgrid" />
		<!-- Radial glow -->
		<div class="inv-glow" />

		<!-- Hint -->
		<p v-if="!opened" class="inv-hint">
			<span class="inv-hint-line" />
			Click to open
			<span class="inv-hint-line" />
		</p>

		<!-- Envelope + card area -->
		<div class="inv-center">

			<!-- ── ENVELOPE ── -->
			<div class="inv-env-wrap" :class="{ 'inv-env-opened': opened }" @click="openInvite">
				<div class="inv-env-body">
					<!-- SVG envelope: correct front-of-envelope fold geometry -->
					<svg class="inv-env-svg" viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
						<!-- Base fill -->
						<rect width="340" height="210" fill="#2d1a22" rx="3" />
						<!-- Left flap triangle -->
						<polygon points="0,0 170,105 0,210" fill="#281520" />
						<!-- Right flap triangle -->
						<polygon points="340,0 170,105 340,210" fill="#22111c" />
						<!-- Bottom flap triangle (darkest) -->
						<polygon points="0,210 170,105 340,210" fill="#180e14" />
						<!-- Subtle gold edge highlights -->
						<line x1="0" y1="0" x2="170" y2="105" stroke="rgba(180,130,60,0.12)" stroke-width="1" />
						<line x1="340" y1="0" x2="170" y2="105" stroke="rgba(180,130,60,0.12)" stroke-width="1" />
						<line x1="0" y1="210" x2="170" y2="105" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
						<line x1="340" y1="210" x2="170" y2="105" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
					</svg>

					<!-- Top flap (animates open) -->
					<div class="inv-flap" :class="{ 'inv-flap-open': opened }">
						<svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
							style="width:340px;height:120px;display:block;">
							<defs>
								<linearGradient id="darkFlapGrad" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stop-color="#3a2030" />
									<stop offset="100%" stop-color="#2d1a22" />
								</linearGradient>
							</defs>
							<polygon points="0,0 340,0 170,105" fill="url(#darkFlapGrad)" />
							<!-- Gold bottom edge line -->
							<line x1="0" y1="0" x2="170" y2="105" stroke="rgba(180,130,60,0.2)" stroke-width="0.5" />
							<line x1="340" y1="0" x2="170" y2="105" stroke="rgba(180,130,60,0.2)" stroke-width="0.5" />
						</svg>
					</div>

					<!-- Wax seal -->
					<div class="inv-seal" :class="{ 'inv-seal-gone': opened }">
						<div class="inv-seal-ring">
							<span class="inv-seal-initials">G</span>
							<span class="inv-seal-amp">&amp;</span>
							<span class="inv-seal-initials">K</span>
						</div>
					</div>
				</div>
			</div>

			<!-- ── INVITATION CARD ── -->
			<div class="inv-card-wrap" :class="{ 'inv-card-visible': letterVisible }">
				<div class="inv-card">
					<!-- Corner ornaments via pseudo, inner frame -->
					<div class="inv-card-inner">

						<div class="inv-divider">
							<span class="inv-divider-line" />
							<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
								<path d="M6 0.5L7.06 3.9H10.6L7.77 5.98L8.83 9.38L6 7.3L3.17 9.38L4.23 5.98L1.4 3.9H4.94Z"
									fill="rgba(180,130,60,0.75)" />
							</svg>
							<span class="inv-divider-line" />
						</div>

						<!-- Monogram -->
						<div class="inv-monogram">
							<div class="inv-monogram-ring">
								<div class="inv-monogram-inner">
									<span class="inv-mono-letters">G K</span>
									<span class="inv-mono-amp">&amp;</span>
								</div>
							</div>
						</div>

						<span class="inv-label-top">You are cordially invited</span>
						<p class="inv-label-sub">to celebrate the wedding of</p>

						<h1 class="inv-names"><em>Govind</em> &amp; <em>Krishnendu</em></h1>
						<p class="inv-date">09 · January · 2027 &nbsp;·&nbsp; Thrissur</p>

						<div class="inv-divider inv-divider-sm">
							<span class="inv-divider-line inv-divider-short" />
							<svg width="8" height="8" viewBox="0 0 8 8">
								<circle cx="4" cy="4" r="2" fill="rgba(180,130,60,0.55)" />
							</svg>
							<span class="inv-divider-line inv-divider-short" />
						</div>

						<button class="inv-btn" type="button" @click="enterWedding">
							Enter our Wedding
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom "With love" line -->
		<div class="inv-footer">
			<span class="inv-footer-line" />
			<span class="inv-footer-text">With love</span>
			<span class="inv-footer-line" />
		</div>
	</div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&display=swap");

/* ─────────────────────────────────────────
   STAGE
───────────────────────────────────────── */
.inv-stage {
	position: fixed;
	inset: 0;
	z-index: 50;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	background: #1a0a0f;
	font-family: "Cormorant Garamond", serif;
	transition: opacity 0.8s ease;
}

.inv-exiting {
	opacity: 0;
	pointer-events: none;
}

/* dot grid texture */
.inv-dotgrid {
	position: absolute;
	inset: 0;
	pointer-events: none;
	background-image: radial-gradient(circle, rgba(180, 130, 60, 0.07) 1px, transparent 1px);
	background-size: 22px 22px;
}

/* ambient glow */
.inv-glow {
	position: absolute;
	width: 480px;
	height: 480px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(180, 110, 30, 0.13) 0%, transparent 70%);
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	pointer-events: none;
}

/* ─────────────────────────────────────────
   HINT
───────────────────────────────────────── */
.inv-hint {
	position: absolute;
	top: 18%;
	display: flex;
	align-items: center;
	gap: 12px;
	font-family: "Cinzel", serif;
	font-size: 9px;
	letter-spacing: 0.45em;
	text-transform: uppercase;
	color: rgba(180, 130, 60, 0.55);
	z-index: 10;
	animation: inv-breathe 3s ease-in-out infinite;
}

.inv-hint-line {
	display: inline-block;
	width: 32px;
	height: 0.5px;
	background: rgba(180, 130, 60, 0.4);
}

@keyframes inv-breathe {

	0%,
	100% {
		opacity: 0.6;
	}

	50% {
		opacity: 1;
	}
}

/* ─────────────────────────────────────────
   CENTER CONTAINER
───────────────────────────────────────── */
.inv-center {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 420px;
	width: 100%;
	max-width: 480px;
	padding: 0 24px;
}

/* ─────────────────────────────────────────
   ENVELOPE
───────────────────────────────────────── */
.inv-env-wrap {
	position: relative;
	width: 340px;
	cursor: pointer;
	transition: transform 0.4s ease;
	flex-shrink: 0;
}

.inv-env-wrap:hover {
	transform: scale(1.02);
}

.inv-env-opened {
	pointer-events: none;
	animation: inv-env-exit 0.5s ease 0.9s forwards;
}

@keyframes inv-env-exit {
	to {
		opacity: 0;
		transform: scale(0.88) translateY(12px);
		visibility: hidden;
	}
}

.inv-env-body {
	position: relative;
	width: 340px;
	height: 210px;
	border: 1px solid rgba(180, 130, 60, 0.35);
	border-radius: 3px;
	overflow: hidden;
	box-shadow:
		0 30px 80px rgba(0, 0, 0, 0.65),
		inset 0 1px 0 rgba(180, 130, 60, 0.18);
}

.inv-env-svg {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	display: block;
	z-index: 1;
}

/* flap */
.inv-flap {
	position: absolute;
	top: 0;
	left: 0;
	width: 340px;
	height: 120px;
	z-index: 4;
	transform-origin: top center;
	transform-style: preserve-3d;
	backface-visibility: hidden;
	transition: transform 0.85s cubic-bezier(0.4, 0, 0.2, 1);
}

.inv-flap-open {
	transform: rotateX(-172deg);
}

/* wax seal */
.inv-seal {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 5;
	transition: transform 0.35s ease, opacity 0.35s ease;
}

.inv-seal-gone {
	transform: translate(-50%, -50%) scale(0);
	opacity: 0;
}

.inv-seal-ring {
	width: 68px;
	height: 68px;
	border-radius: 50%;
	background: radial-gradient(circle at 38% 32%, #d4a837, #7a5a18);
	border: 2px solid rgba(255, 215, 100, 0.35);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1px;
	box-shadow:
		0 4px 22px rgba(180, 130, 40, 0.45),
		inset 0 1px 0 rgba(255, 215, 100, 0.25);
	position: relative;
}

.inv-seal-ring::before {
	content: "";
	position: absolute;
	inset: 5px;
	border-radius: 50%;
	border: 0.5px solid rgba(255, 215, 100, 0.4);
}

.inv-seal-initials {
	font-family: "Cinzel", serif;
	font-size: 14px;
	font-weight: 600;
	color: #1a0a0f;
	letter-spacing: 0;
	line-height: 1;
}

.inv-seal-amp {
	font-family: "Cormorant Garamond", serif;
	font-style: italic;
	font-size: 11px;
	font-weight: 300;
	color: rgba(26, 10, 15, 0.65);
	line-height: 1;
	margin-top: 2px;
}

/* ─────────────────────────────────────────
   PETALS (global because injected via JS)
───────────────────────────────────────── */
/* using :global for dynamically appended elements */

/* ─────────────────────────────────────────
   INVITATION CARD
───────────────────────────────────────── */
.inv-card-wrap {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -40%) translateY(40px);
	opacity: 0;
	transition:
		opacity 0.75s ease 0.65s,
		transform 0.9s cubic-bezier(0.34, 1.25, 0.64, 1) 0.6s;
	pointer-events: none;
	z-index: 20;
	width: 310px;
}

.inv-card-visible {
	opacity: 1;
	transform: translate(-50%, -50%) translateY(0);
	pointer-events: all;
}

.inv-card {
	background: #f9f3e8;
	border: 1px solid rgba(180, 130, 60, 0.28);
	border-radius: 3px;
	padding: 36px 32px 32px;
	text-align: center;
	box-shadow:
		0 40px 100px rgba(0, 0, 0, 0.72),
		0 0 0 5px rgba(180, 130, 60, 0.07);
	position: relative;
	overflow: hidden;
}

/* gold corner ornaments */
.inv-card::before,
.inv-card::after {
	content: "";
	position: absolute;
	width: 44px;
	height: 44px;
	background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 4 L4 18 M4 4 L18 4' stroke='%23b08020' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='4' cy='4' r='1.5' fill='%23b08020'/%3E%3C/svg%3E");
	background-size: contain;
	background-repeat: no-repeat;
}

.inv-card::before {
	top: 8px;
	left: 8px;
}

.inv-card::after {
	bottom: 8px;
	right: 8px;
	transform: rotate(180deg);
}

.inv-card-inner {
	border: 0.5px solid rgba(180, 130, 60, 0.3);
	border-radius: 2px;
	padding: 26px 18px 22px;
}

/* dividers */
.inv-divider {
	display: flex;
	align-items: center;
	gap: 8px;
	justify-content: center;
	margin-bottom: 18px;
}

.inv-divider-sm {
	margin-bottom: 18px;
	margin-top: 0;
}

.inv-divider-line {
	width: 44px;
	height: 0.5px;
	background: linear-gradient(to right, transparent, rgba(180, 130, 60, 0.65));
}

.inv-divider-line+svg~.inv-divider-line,
.inv-divider-line:last-child {
	transform: scaleX(-1);
}

.inv-divider-short {
	width: 26px;
}

/* monogram */
.inv-monogram {
	margin: 0 auto 18px;
	width: 88px;
	height: 88px;
}

.inv-monogram-ring {
	width: 88px;
	height: 88px;
	border-radius: 50%;
	background: radial-gradient(circle at 38% 32%, #d4a837, #7a5a18);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow:
		0 4px 22px rgba(180, 130, 40, 0.38),
		0 0 0 3px rgba(180, 130, 60, 0.14),
		0 0 0 6px rgba(180, 130, 60, 0.06);
	position: relative;
}

.inv-monogram-ring::before {
	content: "";
	position: absolute;
	inset: 5px;
	border-radius: 50%;
	border: 0.5px solid rgba(255, 215, 100, 0.45);
}

.inv-monogram-inner {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	line-height: 1;
}

.inv-mono-letters {
	font-family: "Cinzel", serif;
	font-size: 24px;
	font-weight: 600;
	color: #1a0a0f;
	letter-spacing: 0.06em;
}

.inv-mono-amp {
	font-family: "Cormorant Garamond", serif;
	font-style: italic;
	font-size: 12px;
	font-weight: 300;
	color: rgba(26, 10, 15, 0.6);
	margin-top: 1px;
}

/* text labels */
.inv-label-top {
	display: block;
	font-family: "Cinzel", serif;
	font-size: 8.5px;
	letter-spacing: 0.45em;
	text-transform: uppercase;
	color: rgba(180, 130, 60, 0.8);
	margin-bottom: 7px;
}

.inv-label-sub {
	font-family: "Cormorant Garamond", serif;
	font-style: italic;
	font-size: 13.5px;
	color: #6b4a28;
	margin-bottom: 11px;
	letter-spacing: 0.03em;
}

.inv-names {
	font-family: "Cormorant Garamond", serif;
	font-size: 27px;
	font-weight: 300;
	color: #2d1a10;
	letter-spacing: 0.02em;
	line-height: 1.2;
	margin-bottom: 5px;
}

.inv-names em {
	font-style: italic;
}

.inv-date {
	font-family: "Cinzel", serif;
	font-size: 9.5px;
	letter-spacing: 0.22em;
	color: rgba(180, 130, 60, 0.82);
	margin-bottom: 20px;
}

/* CTA button */
.inv-btn {
	background: linear-gradient(145deg, #d4a837, #8b6818);
	border: none;
	border-radius: 40px;
	padding: 11px 30px;
	font-family: "Cinzel", serif;
	font-size: 9.5px;
	letter-spacing: 0.35em;
	text-transform: uppercase;
	color: #1a0a0f;
	cursor: pointer;
	box-shadow: 0 4px 20px rgba(180, 130, 40, 0.42);
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.inv-btn:hover {
	transform: scale(1.04);
	box-shadow: 0 6px 28px rgba(180, 130, 40, 0.58);
}

.inv-btn:active {
	transform: scale(0.98);
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
.inv-footer {
	position: absolute;
	bottom: 40px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	gap: 12px;
	white-space: nowrap;
}

.inv-footer-line {
	display: inline-block;
	width: 40px;
	height: 0.5px;
	background: rgba(180, 130, 60, 0.3);
}

.inv-footer-text {
	font-family: "Cinzel", serif;
	font-size: 9px;
	letter-spacing: 0.45em;
	text-transform: uppercase;
	color: rgba(180, 130, 60, 0.45);
}
</style>

<!-- Petal keyframe must be global (not scoped) because petals are injected into DOM -->
<style>
@keyframes inv-fall {
	0% {
		transform: translateY(-20px) rotate(0deg);
		opacity: 0.9;
	}

	100% {
		transform: translateY(110vh) rotate(720deg);
		opacity: 0;
	}
}
</style>