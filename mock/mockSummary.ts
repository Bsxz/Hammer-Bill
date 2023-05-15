import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

export const mockSummary: MockMethod[] = [{
  url: '/api/v1/items/summary',
  method: 'get',
  statusCode: 200,
  response: ({ query }: ResponseParams) => {
    const { group_by } = query
    const groups = [
      [
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
      ],
      [
        {
          tag_id: 3678,
          tag: {
            id: 3678,
            user_id: 1397,
            name: faker.word.adjective(5),
            sign: faker.internet.emoji,
            deleted_at: null,
            created_at: '2023-04-17T22:26:39.994+08:00',
            updated_at: '2023-04-17T22:26:39.994+08:00',
            kind: 'expenses'
          },
          amount: faker.number.int({ min: 10000, max: 1000000 })
        },
        {
          tag_id: 3676,
          tag: {
            id: 3676,
            user_id: 1397,
            name: faker.word.adjective(5),
            sign: faker.internet.emoji,
            deleted_at: null,
            created_at: '2023-04-17T22:26:39.989+08:00',
            updated_at: '2023-04-17T22:26:39.989+08:00',
            kind: 'expenses'
          },
          amount: faker.number.int({ min: 10000, max: 1000000 })
        },
        {
          tag_id: 3677,
          tag: {
            id: 3677,
            user_id: 1397,
            name: faker.word.adjective(5),
            sign: faker.internet.emoji,
            deleted_at: null,
            created_at: '2023-04-17T22:26:39.992+08:00',
            updated_at: '2023-04-17T22:26:39.992+08:00',
            kind: 'expenses'
          },
          amount: faker.number.int({ min: 10000, max: 1000000 })
        }
      ]]
    const table = ['happen_at', 'tag_id']
    return {
      groups: groups[table.indexOf(group_by)],
      total: groups[table.indexOf(group_by)].map(v => v.amount).reduce((v, current) => current + v, 0)
    }
  }
}]
