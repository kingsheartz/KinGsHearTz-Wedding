<template>
  <section
    id="rsvp-section"
    class="py-24 text-center bg-[#16171d] border-t border-zinc-800/80"
  >
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <p class="uppercase tracking-[0.25em] text-xs text-rose-300/70 mb-2">
        We’d love to celebrate with you
      </p>
      <h2 class="text-3xl sm:text-4xl font-romantic text-rose-200/95 mb-2 text-center">RSVP & Wishes</h2>
      <p class="text-zinc-400 mb-10 mx-auto text-center max-w-lg">
        Please let us know if you’ll be able to join us on our special day and share a blessing for
        the couple.
      </p>

      <div
        class="relative mx-auto bg-zinc-900/85 backdrop-blur-md rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.35)] border border-zinc-700/80 px-6 sm:px-10 py-8 sm:py-10"
      >
        <div
          class="pointer-events-none absolute -top-10 -right-6 w-24 h-24 bg-rose-500/10 rounded-full blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-12 -left-10 w-32 h-32 bg-rose-600/10 rounded-full blur-3xl"
        ></div>

        <p
          v-if="feedback === 'config'"
          class="relative z-10 mb-4 rounded-xl border border-amber-500/30 bg-amber-950/40 px-4 py-3 text-left text-sm text-amber-100/90"
        >
          RSVP is not connected yet. Add your Apps Script web app URL as
          <code class="rounded bg-zinc-800 px-1 text-amber-200/90">VITE_RSVP_SCRIPT_URL</code> in a
          <code class="rounded bg-zinc-800 px-1 text-amber-200/90">.env</code> file (see
          <code class="rounded bg-zinc-800 px-1 text-amber-200/90">google-apps-script/RSVP.gs</code>).
        </p>
        <p
          v-else-if="feedback === 'ok'"
          class="relative z-10 mb-4 rounded-xl border border-emerald-500/30 bg-emerald-950/35 px-4 py-3 text-left text-sm text-emerald-100/90"
        >
          Thank you! Your RSVP has been saved.
        </p>
        <p
          v-else-if="feedback === 'err'"
          class="relative z-10 mb-4 rounded-xl border border-red-500/35 bg-red-950/35 px-4 py-3 text-left text-sm text-red-100/90"
        >
          {{ errorMessage }}
        </p>

        <form
          class="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left"
          @submit.prevent="onSubmit"
        >
          <div class="sm:col-span-2">
            <label class="block text-xs font-medium text-rose-300/80 mb-1.5">Full Name</label>
            <input
              name="name"
              placeholder="Your Name"
              class="w-full border border-zinc-600/80 rounded-xl p-3 text-sm bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50"
              required
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-rose-300/80 mb-1.5">Mobile number</label>
            <input
              name="phone"
              type="tel"
              inputmode="tel"
              autocomplete="tel"
              placeholder="+91 …"
              class="w-full border border-zinc-600/80 rounded-xl p-3 text-sm bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50"
              required
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-rose-300/80 mb-1.5"
              >Email <span class="text-zinc-500 font-normal">(optional)</span></label
            >
            <input
              name="email"
              type="email"
              inputmode="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="w-full border border-zinc-600/80 rounded-xl p-3 text-sm bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-rose-300/80 mb-1.5">Number of Guests</label>
            <input
              name="guests"
              placeholder="e.g. 2"
              type="number"
              min="1"
              class="w-full border border-zinc-600/80 rounded-xl p-3 text-sm bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-rose-300/80 mb-1.5">Attendance</label>
            <select
              name="attendance"
              class="w-full border border-zinc-600/80 rounded-xl p-3 text-sm bg-zinc-950/80 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50"
              required
            >
              <option value="" disabled selected>Will you attend?</option>
              <option>Happily attending</option>
              <option>Sorry, can’t make it</option>
            </select>
          </div>

          <div class="sm:col-span-2">
            <label class="block text-xs font-medium text-rose-300/80 mb-1.5">
              Message or blessing
            </label>
            <textarea
              name="message"
              rows="3"
              placeholder="Share a wish, prayer, or special memory..."
              class="w-full border border-zinc-600/80 rounded-xl p-3 text-sm resize-none bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50"
            ></textarea>
          </div>

          <div class="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p class="text-[11px] text-zinc-500">
              By submitting, your wishes may be shared with the couple as part of their keepsake.
            </p>
            <button
              type="submit"
              :disabled="submitting"
              class="inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 disabled:opacity-60 disabled:pointer-events-none text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg shadow-rose-900/40 transition transform hover:-translate-y-0.5"
            >
              {{ submitting ? 'Sending…' : 'Send Your Wishes' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <Teleport to="body">
      <iframe
        id="rsvp-gas-target"
        name="rsvp-gas-target"
        title="RSVP submission"
        tabindex="-1"
        aria-hidden="true"
        class="fixed left-0 top-0 w-px h-px border-0 opacity-0 pointer-events-none"
      />
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scriptUrl = (import.meta.env.VITE_RSVP_SCRIPT_URL || '').trim()

const submitting = ref(false)
const feedback = ref<'idle' | 'ok' | 'err' | 'config'>('idle')
const errorMessage = ref('Something went wrong. Please try again or reach out to us directly.')

const PAYLOAD_KEYS = [
  'name',
  'phone',
  'email',
  'guests',
  'attendance',
  'message',
] as const

function postPayloadToAppsScript(url: string, payload: Record<string, string>) {
  const frame = document.getElementsByName('rsvp-gas-target')[0] as HTMLIFrameElement | undefined
  if (!frame) {
    throw new Error('RSVP iframe missing')
  }

  const proxy = document.createElement('form')
  proxy.method = 'POST'
  proxy.action = url
  proxy.target = 'rsvp-gas-target'
  proxy.enctype = 'application/x-www-form-urlencoded'
  proxy.acceptCharset = 'UTF-8'
  proxy.style.display = 'none'

  for (const key of PAYLOAD_KEYS) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = payload[key] ?? ''
    proxy.appendChild(input)
  }

  document.body.appendChild(proxy)
  proxy.submit()
  proxy.remove()
}

function onSubmit(ev: Event) {
  const form = ev.target as HTMLFormElement
  if (!scriptUrl) {
    feedback.value = 'config'
    return
  }

  const fd = new FormData(form)
  const payload = {
    name: String(fd.get('name') || '').trim(),
    phone: String(fd.get('phone') || '').trim(),
    email: String(fd.get('email') || '').trim(),
    guests: String(fd.get('guests') || '').trim(),
    attendance: String(fd.get('attendance') || '').trim(),
    message: String(fd.get('message') || '').trim(),
  }

  submitting.value = true
  feedback.value = 'idle'
  errorMessage.value = 'Something went wrong. Please try again or reach out to us directly.'

  try {
    postPayloadToAppsScript(scriptUrl, payload)
    feedback.value = 'ok'
    form.reset()
  } catch {
    feedback.value = 'err'
    errorMessage.value =
      'Could not reach the RSVP service. Check the script URL, deployment (“Anyone”), and your connection.'
  } finally {
    submitting.value = false
  }
}
</script>
