import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import type { FiltersState } from '@/interfaces'

/* import { 
  dateFilterBase,
  rangeFilterBase,
  switchFilterBase
} from '@/factories'
 */
export const useStoreFilter = create<FiltersState>()(
  devtools(subscribeWithSelector((set) => ({
    values: {},
    set: (key, value) => set((state) => ({ values: { ...state.values, [key]: value } })),
    reset: () => set({ values: {} })
/*     dateFilter: { ...dateFilterBase },
    setDateFilter: (data) => set((state) => ({ dateFilter: { ...state.dateFilter, ...data } })),
    rangeFilter: { ...rangeFilterBase },
    setRangeFilter: (data) => set((state) => ({ rangeFilter: { ...state.rangeFilter, ...data } })),
    switchFilter: { ...switchFilterBase },
    setSwitchFilter: (data) => set((state) => ({ switchFilter: { ...state.switchFilter, ...data } })) */
}))))