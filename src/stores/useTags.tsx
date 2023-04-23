import {create} from 'zustand'
import {Tag} from './store'

type TagsStore = {
    expensesTags: Tag[]
    incomeTags: Tag[]
    setExpensesTags: (v: Tag[]) => void
    setIncomeTags: (v: Tag[]) => void
}
export const useTags = create<TagsStore>((set) => ({
    expensesTags: [],
    incomeTags: [],
    setExpensesTags: (tag) => set(({expensesTags: tag})),
    setIncomeTags: (tag) => set(({incomeTags: tag}))
}))