import { create } from 'zustand'
import type { Menu } from './store'

export const useMenuStore = create<Menu>(set => ({
  visible: false,
  start: false,
  setVisible: (visible) => {
    set({ visible })
  },
  setStart: (start) => {
    set({ start })
  }
}))
