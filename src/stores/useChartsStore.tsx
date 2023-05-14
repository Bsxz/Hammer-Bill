import { create } from 'zustand'
import type { Chart } from './store'

export const useChartsStore = create<Chart>(set => ({
    data: {
        line: [],
        pie: [
            { name: '工作', value: 1200000 },
            { name: '副业', value: 800000 }
        ],
        bar: [
            { key: '工作', sign: '🤚', value: 1200000 },
            { key: '副业', sign: '🤚', value: 800000 }
        ]
    },
    barColors: [],
    setData: (v) => set((state) => ({ data: { ...state.data, ...v } })),
    setBarColors: (v) => {
        set(({ barColors: v }))
    }
}))
