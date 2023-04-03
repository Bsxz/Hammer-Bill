import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/me',
    method: 'get',
    timeout: 1000,
    response: (): Resource<User> => {
      return {
        resource: {
          id: 1,
          email: 'dudu@dudu.com',
          created_at: '首次创建时间',
          updated_at: '最后一次更新时间'
        }
      }
    }
  },
  {
    url: '/api/v1/item',
    method: 'get',
    timeout: 5000,
    response: (): Resources<Item, Pager> => {
      return {
        resources: [],
        pager: {
          page: 1,
          per_page: 25,
          count: 100
        }
      }
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
    }
  }
] as MockMethod[]
