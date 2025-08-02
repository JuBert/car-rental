<script setup lang="ts">
defineProps<{
    place?: string | null,
}>()

const emit = defineEmits(['selectPlace'])

onMounted(async () => {
    // Ensure Google Maps JS API is loaded with Places library
    // @ts-ignore
    await google.maps.importLibrary("places") as google.maps.PlacesLibrary
    // @ts-ignore
    const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement()
    document.getElementsByClassName("wrapper")[0]?.appendChild(placeAutocomplete)

    // Add the gmp-placeselect listener, and display the results.
    //@ts-ignore
    placeAutocomplete.addEventListener('gmp-select', async ({ placePrediction }) => {
        const place = placePrediction.toPlace();
        await place.fetchFields({ fields: ['displayName'] });
        emit('selectPlace', place.toJSON().displayName || null)
    })
})
</script>

<template>
    <div class="wrapper">
    </div>
</template>
