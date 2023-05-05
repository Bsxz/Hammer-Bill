import type { MockMethod } from 'vite-plugin-mock'
import { mockItem } from './mockItems'
import { mockLogin } from './mockLogin'
import { mockMe } from './mockMe'
import { mockTags } from './mockTags'

export default [
  mockMe,
  mockItem,
  mockLogin,
  mockTags
] as MockMethod[]
