<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <NuxtPage v-if="route.params.bookingId" />
  <WeeklyCalendar v-else />
</template>