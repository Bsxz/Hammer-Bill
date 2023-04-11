import { create } from 'zustand'
import type { Local } from './store'

const init = localStorage.getItem('hasReadWelcome')
export const useLocalStore = create<Local>(set => ({
  hasReadWelcome: init === 'yes',
  setHasReadWelcome: (read: boolean) => {
    const result = read ? 'yes' : 'no'
    localStorage.setItem('hasReadWelcome', result)
    set({ hasReadWelcome: result === 'yes' })
  }
}))
