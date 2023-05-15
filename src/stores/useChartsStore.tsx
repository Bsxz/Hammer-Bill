import { create } from 'zustand'
import type { Chart } from './store'

export const useChartsStore = create<Chart>(set => ({
    data: {
        line: [],
        bar: [],
        pie: [],
        total: 0
    },
    barColors: [],
    setData: (v) => set((state) => ({ data: { ...state.data, ...v } })),
    setBarColors: (v) => {
        set(({ barColors: v }))
    }
}))
