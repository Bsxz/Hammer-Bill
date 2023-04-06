import {ReactNode} from 'react'
import {create} from 'zustand'
import {ThisMonth} from '../pages/rangesPage/ThisMonth'

export type Range = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom' | 'spending' | 'income'
export type Ranges<T> = { key: T, text: string, element: ReactNode }[]

export interface Selected<T> {
    select: T
    ranges: Ranges<T>
    backSelect: T
    onChange: (select: T) => void
    onBack: (back: T) => void
}

export const useSelectStore = create<Selected<Range>>(set => ({
    select: 'thisMonth',
    backSelect: 'thisMonth',
    ranges: [{key: 'thisMonth', text: '本月', element: <ThisMonth />}],
    onChange: (select) => {
        set({select})
    },
    onBack: (back) => {
        set({backSelect: back})
    }
}))
