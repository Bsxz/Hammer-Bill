import type {MockMethod} from 'vite-plugin-mock'
import {mockItem} from './mockItems'
import {mockMe} from './mockMe'

export default [
  mockMe,
  mockItem
] as MockMethod[]
