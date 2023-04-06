import {create} from 'zustand'
import {Menu} from './store'

interface Popup {
    visible: Menu['visible']
    setVisible: Menu['setVisible']
}

export const usePopupStore = create<Popup>((set) => ({
    visible: false,
    setVisible: (visible) => {
        set({visible})
    }
}))
