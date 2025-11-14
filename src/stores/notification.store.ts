import { create } from 'zustand'
import type { NotificationState, CounterNotification } from '@/interfaces'

export const useStoreNotification = create<NotificationState>((set) => ({
  slide: false,
  setSlide: (value: boolean) => set(() => ({ slide: value })),
  counter: { inbox: 0, noread: 0 },
  setCounter: (value: CounterNotification) => set(() => ({ counter: value })),
  notifications: [],
  tab: 'inbox',
  setTab: (value: string) => set(() => ({ tab: value })),
  errorBack: null
}))