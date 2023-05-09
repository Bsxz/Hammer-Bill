import type { MockMethod } from 'vite-plugin-mock'

export const mockLogin: MockMethod[] = [{
  url: '/api/v1/session',
  method: 'post',
  timeout: 10,
  response: (): { 'jwt': string } => {
    return {
      jwt: 'uiasjdiajsdijasid'
    }
  }
}]
