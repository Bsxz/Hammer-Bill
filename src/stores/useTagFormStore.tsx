import {Partial} from '@react-spring/web'
import {create} from 'zustand'
import {FormError} from '../lib/validata'
import {Tag, TagForm} from './store'

export const useTagFormStore = create<TagForm>((set) => ({
    data: {
        name: '',
        kind: 'expenses',
        sign: ''
    },
    error: {
        name: [],
        kind: [],
        sign: []
    },
    setData: (data: Partial<Tag>) => {
        set((state) => ({...state, data: {...state.data, ...data}}))
    },
    setError: (error: Partial<FormError<Tag>>) => {
        set(() => ({error: {...error}}))
    }
}))