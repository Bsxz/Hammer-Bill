import {faker} from '@faker-js/faker'
import type {MockMethod} from 'vite-plugin-mock'

let id = 0
const createId = () => {
    return id += 1
}
const createMe = (): User => {
    return {
        id: createId(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.past().toISOString()
    }
}
const createResourece = (): Resource<User> => {
    return {
        resource: createMe()
    }
}
export const mockMe: MockMethod = {
    url: '/api/v1/me',
    method: 'get',
    timeout: 10,
    statusCode: 401,
    response: (): Resource<User> => {
        return createResourece()
    }
}
