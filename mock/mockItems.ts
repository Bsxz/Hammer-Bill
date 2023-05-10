import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

let id = 0
function createId() {
    return id += 1
}
function create(attrs?: Partial<Item>): Item {
    return {
        id: createId(),
        user_id: 1,
        amount: faker.datatype.number({ min: 99, max: 1000_00 }),
        note: '1',
        tag_ids: [1, 2],
        happen_at: faker.date.past().toISOString(),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.past().toISOString(),
        tags: [
            {
                id: faker.datatype.number(),
                user_id: faker.datatype.number(),
                name: faker.internet.userName(),
                sign: '😡',
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
                kind: 'expenses',
            }
        ],
        ...attrs,
        kind: 'expenses',
    }
}
function createList(n: number, attrs?: Partial<Item>): Item[] {
    return Array.from({ length: n }).map(() => create(attrs))
}
function createResponse({ count = 10, perPage = 10, page = 1 }, attrs?: Partial<Item>): Resources<Item> {
    const _perPage = count - (page - 1) * perPage
    return {
        resources: _perPage > 0 ? createList(Math.min(_perPage, perPage), attrs) : [],
        pager: {
            page,
            per_page: perPage,
            count
        }
    }
}
export const mockItem: MockMethod[] = [{
    url: '/api/v1/items',
    method: 'get',
    timeout: 500,
    statusCode: 200,
    response: ({ query }: ResponseParams): Resources<Item> => {
        return createResponse({ page: parseInt(query.page) || 1, count: 40, perPage: 10 })
    }
},
{
    url: '/api/v1/items',
    method: 'post',
    statusCode: 200,
    response: ({ body }: Response): Resource<Item> => {
        return {
            resource: create(body as Partial<Item>)
        }
    }
}]
