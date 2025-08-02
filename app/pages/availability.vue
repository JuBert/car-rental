<script setup lang="ts">
const date = ref(new Date());
const formattedDate = new Intl.DateTimeFormat(navigator.language).format(date.value)
const currentMonth = date.value.getMonth() + 1 // Months are zero-based in JavaScript
const updateDate = (newDate: Date) => {
    date.value = newDate;
    console.log('Updated date:', date.value);
}
</script>

<template>
    <div>
        <DateInput 
            :date="date"
            @update:date="updateDate($event)"
        />
    </div>
    <!-- <pre>date {{ date }}</pre> -->
    <!-- <pre>{{ date.toISOString().substring(0, 10) }}</pre> -->
    <!-- <pre>currentMonth {{ currentMonth }}</pre> -->
    <!-- <pre>formattedDate {{ formattedDate }}</pre> -->
</template>
