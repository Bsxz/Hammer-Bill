import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

export const mockSummary: MockMethod[] = [{
  url: '/api/v1/items/summary',
  method: 'get',
  statusCode: 200,
  response: () => {
    const groups = [
      {
        happen_at: '2023-05-03',
        tag: null,
        amount: faker.number.int({ min: 10000, max: 1000000 })
      },
      {
        happen_at: '2023-05-04',
        tag: null,
        amount: faker.number.int({ min: 10000, max: 1000000 })
      },
      {
        happen_at: '2023-05-05',
        tag: null,
        amount: faker.number.int({ min: 10000, max: 1000000 })
      },
      {
        happen_at: '2023-05-09',
        tag: null,
        amount: faker.number.int({ min: 10000, max: 1000000 })
      },
      {
        happen_at: '2023-05-14',
        tag: null,
        amount: faker.number.int({ min: 10000, max: 1000000 })
      }
    ]
    return {
      groups,
      total: groups.map(v => v.amount).reduce((v, current) => current + v, 0)
    }
  }
}]
