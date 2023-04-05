import {create} from 'zustand'

interface Menu {
    visible: boolean
    start: boolean
    setVisible: (visible: boolean) => void
    setStart: (start: boolean) => void
}

export const useMenuStore = create<Menu>(set => ({
    visible: false,
    start: false,
    setVisible: (visible) => {
        set({visible})
    },
    setStart: (start) => {
        set({start})
    }
}))
