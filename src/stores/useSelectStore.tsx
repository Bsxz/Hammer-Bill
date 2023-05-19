import { create } from 'zustand'

export type Range = 'thisMonth' | 'lastMonth' | 'thisYear' | 'afterYear' | 'custom' | 'expenses' | 'income'
export type Ranges<T> = { key: T; text: string }[]

export interface Selected<T> {
    select: T
    tabs: Ranges<T>
    backSelect: T
    onChange: (select: T) => void
    onBack: (back: T) => void
}

export const useSelectStore = create<Selected<Range>>(set => ({
    select: 'thisMonth',
    backSelect: 'thisMonth',
    tabs: [{ key: 'thisMonth', text: '本月' }],
    onChange: (select) => {
        set({ select })
    },
    onBack: (back) => {
        set({ backSelect: back })
    }
}))
