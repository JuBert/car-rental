<script setup lang="ts">
defineProps<{
    date: Date,
}>()
</script>

<template>
    <div class="flex flex-col items-center">
        <label for="start">
            Start date:
        </label>
        <input
            class="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="date"
            id="start"
            name="trip-start"
            :value="date.toISOString().substring(0, 10)"
            min="2025-01-01"
            max="2025-12-31"
            @input="$emit('update:date', new Date($event.target?.value))"
        />
    </div>
</template>

<style scoped>

</style>