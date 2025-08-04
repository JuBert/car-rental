<script setup lang="ts">
import type { stationType } from '~/assets/types'

const runtimeConfig = useRuntimeConfig()
const selectedStation = useStation()

const apiUrl = ref<string>(`${runtimeConfig.public.baseUrl}/stations`)

const selectStation = (station: stationType) => {
    selectedStation.value = station
    navigateToStationPage()
}

const navigateToStationPage = () => {
    if (selectedStation.value) {
        const stationId = selectedStation.value?.id
        navigateTo({ path: `/station/${stationId}` })
    }
}
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="max-w-md w-full mx-auto p-8 bg-white rounded shadow">
            <h1 class="text-2xl font-bold text-blue-700 mb-6 text-center">
                Select the station
            </h1>
            <AutoCompleteInput
                class="w-full"
                :api-url="apiUrl" 
                placeholder="Search for a station" 
                error-message="No stations found"
                @select="selectStation($event)"
            />
        </div>
    </div>
</template>
