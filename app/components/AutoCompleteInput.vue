<script setup lang="ts">
import { ref, watch } from 'vue'
import type { stationType } from '~/assets/types'

const props = defineProps<{
    apiUrl: string,
    errorMessage?: string,
    placeholder?: string,
}>()

const search = ref('')
const suggestions = ref<stationType[]>([])
const loading = ref(false)
const error = ref('')
const emit = defineEmits(['select'])

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

const fetchSuggestions = async (val:string) => {
    try {
        const apiUrl = `${props.apiUrl}?search=${encodeURIComponent(val)}`
        const stations = await $fetch<stationType[]>(apiUrl)
        suggestions.value = stations.filter(station =>
            station.name.toLowerCase().includes(val.toLowerCase())
        )
    } catch (e) {
        error.value = props.errorMessage || 'Error fetching'
        suggestions.value = []
    }
}

watch(search, (val) => {
    if (debounceTimeout) clearTimeout(debounceTimeout)
    error.value = ''
    if (!val) {
        suggestions.value = []
        error.value = ''
        return
    }
    debounceTimeout = setTimeout(async () => {
        loading.value = true
        fetchSuggestions(val)
        loading.value = false
    }, 300)
})

const selectStation = (station: stationType) => {
    search.value = station.name
    suggestions.value = []
    error.value = ''
    emit('select', station)
}
</script>

<template>
    <div class="relative w-64">
        <input
            v-model="search" type="text" :placeholder="placeholder || 'Search...'"
            class="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <ul 
            v-if="suggestions.length" 
            class="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow"
        >
            <li 
                v-for="station in suggestions" 
                :key="station.id" 
                @click="selectStation(station)"
                class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
                {{ station.name }}
            </li>
        </ul>
        <div 
            v-if="loading" 
            class="absolute right-2 top-2 text-gray-400 text-xs"
        >
            Loading...
        </div>
        <div 
            v-if="error" 
            class="text-red-500 mt-2 text-sm"
        >
            {{ error }}
        </div>
        <pre>suggestions {{ suggestions }}</pre>
    </div>
</template>