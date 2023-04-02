import {create} from 'zustand'

export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'

export interface Selected {
    selected: 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'
    onSelected: (selected: TimeRange) => void
}

export const useSelectStore = create<Selected>((set) => ({
    selected: 'thisMonth',
    onSelected: (selected) => {
        set({selected})
    }
}))
