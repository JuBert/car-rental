<script setup lang="ts">
const router = useRouter()
const selectedPlace = ref<string | null>(null)

const selectPlace = (place: string | null) => {
    selectedPlace.value = place
    if (!place) return
    navigateToAvailability()
}

const navigateToAvailability = () => {
    router.push('/availability')
}

const resetInput = () => {
    selectedPlace.value = null
}

onMounted(() => resetInput())

</script>
<template>
    <div>
        <pre class="text-prominent">Where do you want to rent a car?</pre>
        <div>
            <GoogleMapsInput
                place="selectedPlace"
                @selectPlace="selectPlace($event)"
            />
        </div>
    </div>
</template>
 