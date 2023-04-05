import {Partial} from '@react-spring/web'
import {create} from 'zustand'
import {FormError} from '../lib/validata'

type Data = {
    email: string
    code: string
}

interface Login {
    data: Data
    error: FormError<Data>
    setData: (data: Partial<Data>) => void
    setError: (error: Partial<FormError<Data>>) => void
}

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