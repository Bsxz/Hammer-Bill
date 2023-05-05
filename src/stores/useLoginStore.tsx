import type { Partial } from '@react-spring/web'
import { create } from 'zustand'
import type { FormError } from '../lib/validata'
import type { Data, Login } from './store'

export const useLoginStore = create<Login>(set => ({
    data: {
        // email:''
        email: '1479050219@qq.com', // 测试用例
        code: ''
    },
    error: {
        email: [],
        code: []
    },
    setData: (data: Partial<Data>) => {
        set(state => ({ ...state, data: { ...state.data, ...data } }))
    },
    setError: (error: FormError<Data>) => {
        set(state => ({ ...state, error: { ...error } }))
    }
}
))
