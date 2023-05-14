import type { MockMethod } from 'vite-plugin-mock'
import { mockItem } from './mockItems'
import { mockLogin } from './mockLogin'
import { mockMe } from './mockMe'
import { mockTags } from './mockTags'
import { mockSummary } from './mockSummary'

export default [
  ...mockMe,
  ...mockItem,
  ...mockLogin,
  ...mockTags,
  ...mockSummary
] as MockMethod[]
