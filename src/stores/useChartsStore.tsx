import { create } from 'zustand'
import type { Chart } from './store'

export const useChartsStore = create<Chart>(set => ({
  line: {
    x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    y: [15000, 23000, 22400, 21800, 13500, 14700, 26000]
  },
  pie: [
    { name: '吃饭', value: 20000 },
    { name: '购物', value: 122000 },
    { name: '打豆豆', value: 82000 },
    { name: '游戏', value: 50000 },
    { name: '电影', value: 36000 }
  ],
  bar: [
    { key: '吃饭', sign: '🤚', value: 20000 },
    { key: '购物', sign: '🤚', value: 122000 },
    { key: '打豆豆', sign: '🤚', value: 82000 },
    { key: '游戏', sign: '🤚', value: 50000 },
    { key: '电影', sign: '🤚', value: 36000 }
  ],
  setBar: v => (set({ bar: v }))
}))
