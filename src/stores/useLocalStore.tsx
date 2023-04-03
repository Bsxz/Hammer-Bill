import { create } from 'zustand'

interface Local {
  hasReadWelcome: boolean
  setHasReadWelcome: (read: boolean) => void
}
const init = localStorage.getItem('hasReadWelcome')
export const useLocalStore = create<Local>(set => ({
  hasReadWelcome: init === 'yes',
  setHasReadWelcome: (read: boolean) => {
    const result = read ? 'yes' : 'no'
    localStorage.setItem('hasReadWelcome', result)
    set({ hasReadWelcome: result === 'yes' })
  },
}))
