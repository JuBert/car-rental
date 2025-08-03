import type { stationType } from '~/assets/types'
export const useStation = () => useState<stationType | undefined>('station', () => undefined)
