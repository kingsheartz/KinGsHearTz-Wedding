<template>
  <section id="rsvp-section" class="py-24 bg-rose-50 text-center">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <p class="uppercase tracking-[0.25em] text-xs text-rose-400 mb-2">
        We’d love to celebrate with you
      </p>
      <h2 class="text-3xl sm:text-4xl font-romantic text-rose-700 mb-2 text-center">RSVP & Wishes</h2>
      <p class="text-gray-600 mb-10 mx-auto text-center">
        Please let us know if you’ll be able to join us on our special day and share a blessing for
        the couple.
      </p>

      <div
        class="relative mx-auto bg-gradient-to-b from-white/95 to-rose-50/90 backdrop-blur-md rounded-3xl shadow-[0_24px_60px_rgba(244,114,182,0.25)] border border-rose-100/70 px-6 sm:px-10 py-8 sm:py-10"
      >
        <!-- subtle corner accents -->
        <div
          class="pointer-events-none absolute -top-10 -right-6 w-24 h-24 bg-rose-200/20 rounded-full blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-12 -left-10 w-32 h-32 bg-rose-300/20 rounded-full blur-3xl"
        ></div>

        <form
          action="https://formspree.io/f/yourid"
          method="POST"
          class="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left"
        >
          <div class="sm:col-span-2">
            <label class="block text-xs font-medium text-rose-500 mb-1.5">Full Name</label>
            <input
              name="name"
              placeholder="Your Name"
              class="w-full border border-rose-100 rounded-xl p-3 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              required
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-rose-500 mb-1.5">Number of Guests</label>
            <input
              name="guests"
              placeholder="e.g. 2"
              type="number"
              min="1"
              class="w-full border border-rose-100 rounded-xl p-3 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-rose-500 mb-1.5">Attendance</label>
            <select
              name="attendance"
              class="w-full border border-rose-100 rounded-xl p-3 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              required
            >
              <option value="" disabled selected>Will you attend?</option>
              <option>Happily attending</option>
              <option>Sorry, can’t make it</option>
            </select>
          </div>

          <div class="sm:col-span-2">
            <label class="block text-xs font-medium text-rose-500 mb-1.5">
              Message or blessing
            </label>
            <textarea
              name="message"
              rows="3"
              placeholder="Share a wish, prayer, or special memory..."
              class="w-full border border-rose-100 rounded-xl p-3 text-sm resize-none bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
            ></textarea>
          </div>

          <div class="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p class="text-[11px] text-gray-400">
              By submitting, your wishes may be shared with the couple as part of their keepsake.
            </p>
            <button
              class="inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg shadow-rose-300/70 transition transform hover:-translate-y-0.5"
            >
              Send Your Wishes
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
