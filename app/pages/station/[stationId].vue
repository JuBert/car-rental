<script setup lang="ts">
const route = useRoute()
const station = useStation()
const selectedDate = useDate()

const resetState = () => {
  station.value = undefined
  selectedDate.value = undefined
}

const goBack = () => {
    resetState()
    navigateTo({ path: '/' })
}
</script>
<template>
  <NuxtPage v-if="route.params.bookingId" />
  <div v-else>
    <button
      class="mb-4 mx-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
      @click="goBack()"
    >
        ← Back
    </button>
    <WeeklyCalendar />
  </div>
</template>