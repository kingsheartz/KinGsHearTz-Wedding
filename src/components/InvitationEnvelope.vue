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
  const colors = [
    "rgba(244,114,182,0.7)",
    "rgba(251,207,232,0.85)",
    "rgba(236,72,153,0.5)",
    "rgba(255,241,242,0.9)",
    "rgba(190,18,60,0.35)",
    "rgba(249,168,212,0.8)",
  ]
  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div")
    p.className = "inv-petal"
    const size = 5 + Math.random() * 9
    p.style.cssText = `
      position:absolute;
      border-radius:50% 0 50% 0;
      pointer-events:none;
      z-index:1;
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}%;
      top:${-10 - Math.random() * 40}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation:inv-petal-fall ${2.8 + Math.random() * 2}s ease-in ${Math.random() * 0.9}s forwards;
    `
    stage.appendChild(p)
    setTimeout(() => p.remove(), 5500)
  }
}

const emit = defineEmits<{ (e: "enter"): void }>()
</script>

<template>
  <div
    id="inv-stage"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700"
    :class="exiting ? 'opacity-0 pointer-events-none' : ''"
    style="background: linear-gradient(165deg, #fef7f4 0%, #fce7f3 40%, #fbcfe8 100%);"
  >
    <!-- Original diamond pattern overlay -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.04] pattern-diamond" />

    <!-- Hint text -->
    <p v-if="!opened" class="inv-hint absolute z-10">
      <span class="inv-hint-line" />
      Click the envelope to open
      <span class="inv-hint-line inv-hint-line-r" />
    </p>

    <!-- Envelope + card container -->
    <div class="relative flex items-center justify-center min-h-[420px] w-full max-w-lg px-6">

      <!-- ── ENVELOPE ── -->
      <div
        class="inv-env-wrap"
        :class="{ 'inv-env-opened': opened }"
        @click="openInvite"
      >
        <div class="inv-env-body">
          <!-- SVG envelope folds drawn as flat shapes: correct front-of-envelope geometry -->
          <svg class="inv-env-svg" viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <!-- Base: full envelope rectangle (darkest red) -->
            <rect width="340" height="210" fill="#9f1239" rx="3"/>

            <!-- Left flap: triangle from top-left corner to center-middle to bottom-left -->
            <polygon points="0,0 170,105 0,210" fill="#be123c"/>

            <!-- Right flap: triangle from top-right to center-middle to bottom-right -->
            <polygon points="340,0 170,105 340,210" fill="#b01136"/>

            <!-- Bottom flap: triangle from bottom-left to center-middle to bottom-right -->
            <polygon points="0,210 170,105 340,210" fill="#8b0f2e"/>

            <!-- Subtle highlight edges -->
            <line x1="0" y1="0" x2="170" y2="105" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
            <line x1="340" y1="0" x2="170" y2="105" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
            <line x1="0" y1="210" x2="170" y2="105" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
            <line x1="340" y1="210" x2="170" y2="105" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
          </svg>

          <!-- Top flap (animated open) — sits on top as a separate element -->
          <div class="inv-flap" :class="{ 'inv-flap-open': opened }">
            <svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:340px;height:120px;display:block;">
              <!-- Top flap triangle: top-left to top-right, point down to center -->
              <polygon points="0,0 340,0 170,105" fill="#e11d48"/>
              <!-- Subtle inner shadow at bottom edge of flap -->
              <polygon points="0,0 340,0 170,105" fill="url(#flapGrad)"/>
              <defs>
                <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(255,255,255,0.08)"/>
                  <stop offset="100%" stop-color="rgba(0,0,0,0.12)"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <!-- Wax seal -->
          <div class="inv-seal" :class="{ 'inv-seal-gone': opened }">
            <div class="inv-seal-ring">
              <div class="inv-seal-inner">
                <span class="inv-seal-letter">G</span>
                <span class="inv-seal-amp">&amp;</span>
                <span class="inv-seal-letter">K</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── INVITATION CARD ── -->
      <div
        class="inv-card-wrap absolute inset-0 flex items-center justify-center px-6"
        :class="letterVisible ? 'inv-card-visible' : 'inv-card-hidden'"
      >
        <div class="inv-card">
          <div class="inv-card-inner">

            <div class="inv-divider">
              <span class="inv-divider-line" />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L8.2 4.9H12.1L8.9 7.2L10.1 11.1L7 8.8L3.9 11.1L5.1 7.2L1.9 4.9H5.8Z" fill="rgba(190,18,60,0.45)"/>
              </svg>
              <span class="inv-divider-line inv-divider-line-r" />
            </div>

            <div class="inv-monogram">
              <div class="inv-monogram-ring">
                <div class="inv-monogram-inner">
                  <span class="inv-mono-gk">G K</span>
                  <span class="inv-mono-amp">&amp;</span>
                </div>
              </div>
            </div>

            <span class="inv-label-invited">You are cordially invited</span>
            <p class="inv-label-celebrate">to celebrate the wedding of</p>
            <h1 class="inv-names"><em>Govind</em> &amp; <em>Krishnendu</em></h1>
            <p class="inv-date">09 · January · 2027 &nbsp;·&nbsp; Thrissur</p>

            <div class="inv-divider inv-divider-sm">
              <span class="inv-divider-line inv-divider-short" />
              <svg width="8" height="8" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="2" fill="rgba(190,18,60,0.3)"/>
              </svg>
              <span class="inv-divider-line inv-divider-short inv-divider-line-r" />
            </div>

            <button class="inv-btn" type="button" @click="enterWedding">
              Enter our Wedding
            </button>

          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="inv-footer absolute bottom-12 left-1/2 -translate-x-1/2">
      <span class="inv-footer-line" />
      <span class="inv-footer-text">With love</span>
      <span class="inv-footer-line" />
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&display=swap");

.pattern-diamond {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%2393126f' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E");
}

/* ── hint ── */
.inv-hint {
  top: 18%;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "Cinzel", serif;
  font-size: 9px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(190, 18, 60, 0.5);
  animation: inv-breathe 3s ease-in-out infinite;
}
.inv-hint-line {
  display: inline-block;
  width: 30px; height: 0.5px;
  background: linear-gradient(to right, transparent, rgba(190, 18, 60, 0.35));
}
.inv-hint-line-r { transform: scaleX(-1); }

@keyframes inv-breathe {
  0%, 100% { opacity: 0.55; }
  50%       { opacity: 1; }
}

/* ── envelope wrap ── */
.inv-env-wrap {
  position: relative;
  width: 340px;
  cursor: pointer;
  transition: transform 0.45s ease;
  flex-shrink: 0;
}
.inv-env-wrap:hover { transform: scale(1.02); }
.inv-env-opened {
  pointer-events: none;
  animation: inv-env-exit 0.5s ease 0.9s forwards;
}
@keyframes inv-env-exit {
  to { opacity: 0; transform: scale(0.9) translateY(10px); visibility: hidden; }
}

/* ── envelope body ── */
.inv-env-body {
  position: relative;
  width: 340px;
  height: 210px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow:
    0 25px 60px -10px rgba(190, 18, 60, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.inv-env-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

/* ── flap ── */
.inv-flap {
  position: absolute;
  top: 0; left: 0;
  width: 340px;
  height: 120px;
  z-index: 4;
  transform-origin: top center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: transform 0.82s cubic-bezier(0.4, 0, 0.2, 1);
}
.inv-flap-open { transform: rotateX(-175deg); }

/* ── wax seal ── */
.inv-seal {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  transition: transform 0.32s ease, opacity 0.32s ease;
}
.inv-seal-gone {
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
}
.inv-seal-ring {
  width: 70px; height: 70px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 32%, #f9a8d4, #be185d);
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 18px rgba(190, 18, 60, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
}
.inv-seal-ring::before {
  content: "";
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  border: 0.5px solid rgba(255, 255, 255, 0.45);
}
.inv-seal-inner {
  display: flex;
  align-items: center;
  gap: 2px;
  position: relative;
  z-index: 1;
}
.inv-seal-letter {
  font-family: "Cinzel", serif;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-shadow: 0 1px 3px rgba(120, 0, 40, 0.4);
}
.inv-seal-amp {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 11px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 3px;
}

/* ── card ── */
.inv-card-wrap {
  pointer-events: none;
  transition: opacity 0.65s ease 0.65s, transform 0.8s cubic-bezier(0.34, 1.3, 0.64, 1) 0.6s;
}
.inv-card-hidden {
  opacity: 0;
  transform: translateY(28px);
}
.inv-card-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

.inv-card {
  width: 100%;
  max-width: 420px;
  border-radius: 20px;
  padding: 40px 36px 36px;
  text-align: center;
  background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fef7f4 100%);
  border: 1px solid rgba(251, 113, 133, 0.2);
  box-shadow:
    0 25px 60px -10px rgba(0, 0, 0, 0.14),
    0 0 0 1px rgba(251, 113, 133, 0.1);
  position: relative;
}
.inv-card::before,
.inv-card::after {
  content: "";
  position: absolute;
  width: 44px; height: 44px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 4 L4 18 M4 4 L18 4' stroke='%23e11d48' stroke-width='1' fill='none' stroke-linecap='round' opacity='0.35'/%3E%3Ccircle cx='4' cy='4' r='1.5' fill='%23e11d48' opacity='0.35'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}
.inv-card::before { top: 10px; left: 10px; }
.inv-card::after  { bottom: 10px; right: 10px; transform: rotate(180deg); }

.inv-card-inner {
  border: 0.5px solid rgba(225, 29, 72, 0.15);
  border-radius: 12px;
  padding: 28px 20px 24px;
}

/* dividers */
.inv-divider {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-bottom: 18px;
}
.inv-divider-sm { margin-bottom: 18px; }
.inv-divider-line {
  width: 44px; height: 0.5px;
  background: linear-gradient(to right, transparent, rgba(190, 18, 60, 0.4));
}
.inv-divider-line-r { transform: scaleX(-1); }
.inv-divider-short { width: 26px; }

/* monogram */
.inv-monogram {
  margin: 0 auto 18px;
  width: 86px; height: 86px;
}
.inv-monogram-ring {
  width: 86px; height: 86px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 32%, #f9a8d4, #be185d);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 20px rgba(190, 18, 60, 0.28),
    0 0 0 3px rgba(244, 114, 182, 0.18),
    0 0 0 6px rgba(244, 114, 182, 0.07);
  position: relative;
}
.inv-monogram-ring::before {
  content: "";
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  border: 0.5px solid rgba(255, 255, 255, 0.5);
}
.inv-monogram-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}
.inv-mono-gk {
  font-family: "Cinzel", serif;
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.08em;
  text-shadow: 0 1px 4px rgba(120, 0, 40, 0.35);
}
.inv-mono-amp {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 12px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 2px;
}

/* text */
.inv-label-invited {
  display: block;
  font-family: "Cinzel", serif;
  font-size: 8.5px;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(190, 18, 60, 0.65);
  margin-bottom: 7px;
}
.inv-label-celebrate {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 14px;
  color: rgba(190, 18, 60, 0.7);
  margin-bottom: 10px;
  letter-spacing: 0.03em;
}
.inv-names {
  font-family: "Cormorant Garamond", serif;
  font-size: 28px;
  font-weight: 300;
  color: #9f1239;
  letter-spacing: 0.02em;
  line-height: 1.2;
  margin-bottom: 5px;
}
.inv-names em { font-style: italic; }

.inv-date {
  font-family: "Cinzel", serif;
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: rgba(190, 18, 60, 0.6);
  margin-bottom: 20px;
}

/* button */
.inv-btn {
  background: linear-gradient(145deg, #e11d48, #be123c);
  border: none;
  border-radius: 40px;
  padding: 11px 30px;
  font-family: "Cinzel", serif;
  font-size: 9.5px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(190, 18, 60, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.inv-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 26px rgba(190, 18, 60, 0.55);
}
.inv-btn:active { transform: scale(0.98); }

/* footer */
.inv-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
}
.inv-footer-line {
  display: inline-block;
  width: 40px; height: 0.5px;
  background: rgba(190, 18, 60, 0.22);
}
.inv-footer-text {
  font-family: "Cinzel", serif;
  font-size: 9px;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(190, 18, 60, 0.38);
}
</style>

<style>
@keyframes inv-petal-fall {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(700deg); opacity: 0; }
}
</style>