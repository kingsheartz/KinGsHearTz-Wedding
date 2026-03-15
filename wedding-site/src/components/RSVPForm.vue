<template>
  <section id="rsvp-section" class="py-20 bg-rose-50 text-center">
    <h2 class="text-3xl sm:text-4xl font-romantic text-rose-700 mb-4">RSVP</h2>
    <p class="text-gray-600 mb-8 max-w-md mx-auto">
      Please let us know if you’ll be able to join us on our special day.
    </p>

    <form
      action="https://formspree.io/f/yourid"
      method="POST"
      class="max-w-md mx-auto flex flex-col gap-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg shadow-rose-100 px-6 py-6 border border-white/70"
    >
      <input
        name="name"
        placeholder="Your Name"
        class="border border-rose-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
        required
      />

      <input
        name="guests"
        placeholder="Number of Guests"
        type="number"
        min="1"
        class="border border-rose-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
      />

      <select
        name="attendance"
        class="border border-rose-100 rounded-lg p-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
        required
      >
        <option value="" disabled selected>Will you attend?</option>
        <option>Happily attending</option>
        <option>Sorry, can’t make it</option>
      </select>

      <textarea
        name="message"
        rows="3"
        placeholder="Leave a message or blessing"
        class="border border-rose-100 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
      ></textarea>

      <button
        class="mt-2 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-full text-sm font-medium shadow-md shadow-rose-300/70 transition transform hover:-translate-y-0.5"
      >
        Send Your Wishes
      </button>
    </form>
  </section>
</template>
