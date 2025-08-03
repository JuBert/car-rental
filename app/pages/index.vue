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
        const slug = selectedStation.value?.name?.toLowerCase()
        navigateTo({ path: `/${slug}` })
    }
}
</script>

<template>
    <div>
        <p>stations</p>
        <AutoCompleteInput
            :api-url="apiUrl"
            placeholder="Search for a station"
            error-message="No stations found"
            @select="selectStation($event)"
        />
    </div>
</template>
