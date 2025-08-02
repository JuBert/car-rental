<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { data: stations } = await useAsyncData('stations', () => {
    return $fetch(`${runtimeConfig.public.baseUrl}/stations`)
})

</script>

<template>
    <div>
        <pre>stations</pre>
        <pre v-if="stations">{{ stations }}</pre>
    </div>
</template>
