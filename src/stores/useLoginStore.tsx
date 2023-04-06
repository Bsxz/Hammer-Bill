import {Partial} from '@react-spring/web'
import {create} from 'zustand'
import {FormError} from '../lib/validata'
import {Data, Login} from './store'

export const useLoginStore = create<Login>((set) => ({
        data: {
            email: '',
            code: ''
        },
        error: {
            email: [],
            code: []
        },
        setData: (data: Partial<Data>) => {
            set((state) => ({...state, data: {...state.data, ...data}}))
        },
        setError: (error: FormError<Data>) => {
            set((state) => ({...state, error: {...error}}))
        }
    }
))