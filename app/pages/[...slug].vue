<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const selectedStation = useStation()
</script>

<template>
    <div>
        <pre>slug: {{ slug }}</pre>
        <pre>selectedStation {{ selectedStation }}</pre>
    </div>
</template>

