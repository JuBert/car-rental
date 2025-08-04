<script setup lang="ts">
import { ref, computed } from 'vue'
import type { bookingType } from '~/assets/types'

const station = useStation()
const bookingDate = useDate()

function getStartOfWeek(date: Date) {
    const d = new Date(date)
    // Set to Monday as first day of week
    const day = d.getDay()
    const diff = (day === 0 ? -6 : 1 - day) // if Sunday (0), go back 6 days; else, go back to Monday
    d.setDate(d.getDate() + diff)
    d.setHours(0, 0, 0, 0)
    return d
}

function addDays(date: Date, days: number) {
    const d = new Date(date)
    d.setDate(d.getDate() + days)
    d.setHours(0, 0, 0, 0)
    return d
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const calendarStart = bookingDate.value ? new Date(bookingDate.value) : new Date(2020, 0, 6)
const currentWeekStart = ref(getStartOfWeek(calendarStart))

const weekDates = computed(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart.value, i))
})

function prevWeek() {
    currentWeekStart.value = addDays(currentWeekStart.value, -7)
}
function nextWeek() {
    currentWeekStart.value = addDays(currentWeekStart.value, 7)
}

// Helper to check if a booking's start or end date matches a given date
function isSameDay(dateStr: string, date: Date) {
    const d = new Date(dateStr)
    return (
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    )
}

function getBookingsForDate(date: Date, type: 'pickup' | 'return') {
    if (!station.value) return []
    return station.value.bookings.filter(b =>
        type === 'pickup'
            ? isSameDay(b.startDate, date)
            : isSameDay(b.endDate, date)
    )
}

const route = useRoute()
const stationId = route.params.stationId as string

const navigateToBooking = (booking: bookingType, actionType: 'pickup' | 'return') => {
    bookingDate.value = actionType === 'pickup' ? new Date(booking.startDate).toDateString() : new Date(booking.endDate).toDateString()
    navigateTo({ path: `/station/${stationId}/booking/${booking.id}` })
}
</script>

<template>
    <div class="w-full mx-auto p-4">
        <!-- nav -->
        <div class="flex items-center justify-between mb-4">
            <button @click="prevWeek" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">←</button>
            <div class="font-semibold text-lg">
                Week of {{ weekDates?.[0]?.toDateString() }}
            </div>
            <button @click="nextWeek" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">→</button>
        </div>
        <!-- grid -->
        <div class="grid grid-cols-7 gap-2">
            <div v-for="(date, i) in weekDates" :key="i"
                class="flex flex-col items-center p-2 border rounded min-h-[200px]">
                <div class="font-medium mb-1">{{ weekDays[i] }}</div>
                <div class="mb-2">{{ date.getDate() }}/{{ date.getMonth() + 1 }}</div>
                <div v-if="getBookingsForDate(date, 'pickup').length" class="w-full">
                    <div class="text-xs font-semibold text-green-600">Pickups:</div>
                    <ul>
                        <li 
                            v-for="booking in getBookingsForDate(date, 'pickup')" 
                            :key="booking.id"
                            class="text-xs truncate cursor-pointer hover:underline"
                            @click="navigateToBooking(booking, 'pickup')"
                        >
                            {{ booking.customerName }}
                        </li>
                    </ul>
                </div>
                <div v-if="getBookingsForDate(date, 'return').length" class="w-full mt-1">
                    <div class="text-xs font-semibold text-blue-600">Returns:</div>
                    <ul>
                        <li 
                            v-for="booking in getBookingsForDate(date, 'return')" 
                            :key="booking.id"
                            class="text-xs truncate cursor-pointer hover:underline"
                            @click="navigateToBooking(booking, 'return')"
                        >
                            {{ booking.customerName }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>