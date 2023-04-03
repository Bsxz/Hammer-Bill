import type {MockMethod} from 'vite-plugin-mock'
import {mockItem} from './mockItems'
import {mockMe} from './mockMe'

export default [
  mockMe, mockItem

  //   return {
  //     resources: [
  //       {
  //         id: 1,
  //         user_id: 1,
  //         amount: 1000,
  //         note: '1',
  //         tag_ids: [1, 2],
  //         happen_at: '添加时间',
  //         created_at: '首次创建时间',
  //         updated_at: '最后一次更新时间',
  //         kind: 'expenses',
  //       },
  //     ],
  //     pager: {
  //       page: 1,
  //       per_page: 25,
  //       count: 100,
  //     },
  //   }
] as MockMethod[]
