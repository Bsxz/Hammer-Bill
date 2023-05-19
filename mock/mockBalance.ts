import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

export const mockBalance: MockMethod[] = [{
  url: '/api/v1/items/balance',
  method: 'get',
  timeout: 10,
  statusCode: 200,
  response: ({ query }: ResponseParams) => {
    const income = faker.number.int({ min: 40000, max: 1000000 })
    const expenses = faker.number.int({ min: 40000, max: income })
    return {
      income,
      expenses,
      balance: income - expenses
    }
  }
}]
