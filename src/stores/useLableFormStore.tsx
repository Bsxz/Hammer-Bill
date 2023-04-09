import {create} from 'zustand'

interface Lable {
    name: string
    sign: Tags['kind']
}

export const useLableFormStore = create<Lable>((set) => ({
    name: '',
    sign: ''
}))