import type {MockMethod} from 'vite-plugin-mock'
import {mockItem} from './mockItems'
import {mockLogin} from './mockLogin'
import {mockMe} from './mockMe'

export default [
    mockMe,
    mockItem,
    mockLogin
] as MockMethod[]
