<script setup lang="ts">
import type { bookingType } from '~/assets/types'

const route = useRoute()
const bookingId = route.params.bookingId as string
const station = useStation()
const selectedDate = useDate()

const stationName = computed(() => {
    return station.value ? station.value.name : 'Unknown Station'
})

const booking = computed<bookingType | null>(() => {
    return station.value?.bookings.find(b => b.id === bookingId) || null
})

const isPickUp = computed(() => {
    if (!booking.value) return false
    return new Date(booking.value.startDate).toDateString() === selectedDate.value
})

const goBack = () => {
    window.history.length > 1 ? window.history.back() : navigateTo(`/station/${route.params.stationId}`)
}
</script>
<template>
    <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
        <button @click="goBack" class="mb-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            ← Back
        </button>
        <div v-if="booking" class="space-y-4">
            <h2 :class="[{
                'text-green-600':isPickUp,
                'text-blue-600': !isPickUp}, 
                'text-xl font-bold']"
            >
                Booking Details
            </h2>
            <div>
                <span class="font-semibold">Booking ID: </span>
                <span>{{ booking.id }}</span>
            </div>
            <div>
                <span class="font-semibold">Customer: </span>
                <span>{{ booking.customerName }}</span>
            </div>
            <div>
                <span class="font-semibold">Pickup/Return Station : </span>
                <span>{{ stationName }}</span>
            </div>
            <div>
                <span class="font-semibold">Start Date: </span>
                <span :class="{'underline': isPickUp}">{{ new Date(booking.startDate).toDateString() }}</span>
            </div>
            <div>
                <span class="font-semibold">End Date: </span>
                <span :class="{'underline': !isPickUp}">{{ new Date(booking.endDate).toDateString() }}</span>
            </div>
        </div>
        <div v-else class="text-red-500 font-semibold">
            Booking not found.
        </div>
    </div>
</template>