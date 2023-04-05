import {create} from 'zustand'

export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom' | 'spending' | 'income'

export interface Selected {
    selected: TimeRange
    timeRanges: {
        key: TimeRange
        text: string
    }[]
    onSelected: (selected: TimeRange) => void
}

export const useSelectStore = create<Selected>(set => ({
    selected: 'thisMonth',
    timeRanges: [{key: 'thisMonth', text: '本月'}],
    onSelected: (selected) => {
        set({selected})
    }
}))
