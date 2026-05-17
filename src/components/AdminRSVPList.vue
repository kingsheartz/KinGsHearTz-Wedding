<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { showAdminRSVP } from '../state'

interface Guest {
  firstName: string
  lastName: string
  mobile: string
  email: string
  invitedBy: string
  invitation: string
  response: string
  attendingCount: number
  children: string
  notes: string
}

const guests = ref<Guest[]>([])
const loading = ref(true)
const error = ref('')
const secret = 'gk2027' // Must match the secret in Apps Script

const scriptUrl = import.meta.env.VITE_RSVP_SCRIPT_URL

onMounted(async () => {
  if (!scriptUrl) {
    error.value = 'Script URL is missing in environment variables.'
    loading.value = false
    return
  }

  try {
    const res = await fetch(`${scriptUrl}?action=list&secret=${secret}`)
    const json = await res.json()
    if (json.ok) {
      guests.value = json.data
    } else {
      error.value = json.error || 'Failed to fetch RSVP list.'
    }
  } catch (err) {
    error.value = 'Network error while fetching the list.'
  } finally {
    loading.value = false
  }
})

function close() {
  showAdminRSVP.value = false
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex flex-col bg-zinc-950/95 backdrop-blur-md p-4 sm:p-8 overflow-hidden text-rose-50 font-sans">
    
    <div class="flex items-center justify-between mb-6 border-b border-rose-900/50 pb-4">
      <div>
        <h2 class="text-2xl font-romantic text-rose-400">RSVP Guest List</h2>
        <p class="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Confidential Admin View</p>
      </div>
      <button @click="close" class="text-zinc-400 hover:text-rose-400 transition-colors bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 shadow-lg text-sm font-medium">
        Close
      </button>
    </div>

    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
    </div>
    
    <div v-else-if="error" class="flex-1 flex items-center justify-center flex-col gap-4">
      <p class="text-red-400 text-lg bg-red-950/40 px-6 py-4 rounded-xl border border-red-900/50">{{ error }}</p>
    </div>

    <div v-else class="flex-1 overflow-auto bg-zinc-900/50 border border-zinc-800/80 rounded-2xl shadow-xl">
      <table class="w-full text-left border-collapse text-sm">
        <thead class="bg-zinc-900/80 sticky top-0 z-10 shadow-md">
          <tr>
            <th class="px-4 py-3 font-medium text-rose-300 uppercase tracking-wider text-[10px]">Name</th>
            <th class="px-4 py-3 font-medium text-rose-300 uppercase tracking-wider text-[10px]">Mobile</th>
            <th class="px-4 py-3 font-medium text-rose-300 uppercase tracking-wider text-[10px]">Response</th>
            <th class="px-4 py-3 font-medium text-rose-300 uppercase tracking-wider text-[10px] text-center">Guests</th>
            <th class="px-4 py-3 font-medium text-rose-300 uppercase tracking-wider text-[10px]">Message</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-800">
          <tr v-for="(g, i) in guests" :key="i" class="hover:bg-zinc-800/40 transition-colors">
            <td class="px-4 py-3 whitespace-nowrap">
              <span class="font-medium text-rose-100">{{ g.firstName }} {{ g.lastName }}</span>
              <div v-if="g.email" class="text-[10px] text-zinc-500 mt-0.5">{{ g.email }}</div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-zinc-300">{{ g.mobile }}</td>
            <td class="px-4 py-3 whitespace-nowrap">
              <span :class="g.response === 'Yes' ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'" class="px-2 py-1 rounded-md text-[11px] font-medium tracking-wide">
                {{ g.response }}
              </span>
            </td>
            <td class="px-4 py-3 text-center font-mono text-zinc-300">{{ g.attendingCount }}</td>
            <td class="px-4 py-3 text-zinc-400 text-xs max-w-[200px] truncate" :title="g.notes">
              {{ g.notes }}
            </td>
          </tr>
          <tr v-if="guests.length === 0">
            <td colspan="5" class="px-4 py-8 text-center text-zinc-500">No RSVPs found yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
