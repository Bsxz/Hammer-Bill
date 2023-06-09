import type { Partial } from '@react-spring/web'
import { create } from 'zustand'
import type { FormError } from '../lib/validata'
import type { Range } from './useSelectStore'

export interface Item {
    amount: number | string
    kind: Range
    happen_at: string | Date
    tag_ids: number[]
}
export interface CreateItem {
    data: Item
    error: FormError<Item>
    setData: (v: Partial<Item>) => void
    setError: (v: Partial<FormError<Item>>) => void
}
export const useCreateItemStore = create<CreateItem>(set => ({
    data: {
        kind: 'expenses',
        tag_ids: [],
        happen_at: '',
        amount: 0
    },
    error: {},
    setData: (data: Partial<Item>) => {
        set(state => ({ ...state, data: { ...state.data, ...data } }))
    },
    setError: (error: Partial<FormError<Item>>) => {
        set(() => ({ error: { ...error } }))
    }
}))
