import type { stationType, bookingType } from '~/assets/types'

export const useStation = () => useState<stationType | undefined>('station', () => undefined)
export const useDate = () => useState<string | undefined>('date', () => undefined)

