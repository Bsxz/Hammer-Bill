import {faker} from '@faker-js/faker'
import {MockMethod} from 'vite-plugin-mock'

let id = 0
const createId = () => {
    return id += 1
}
const create = (attrs?: Partial<Item<Tags>>): Item<Tags> => {
    return {
        id: createId(),
        user_id: 1,
        amount: faker.datatype.number({min: 99, max: 1000_00}),
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
                kind: 'expenses'
            }
        ],
        kind: 'expenses',
        ...attrs
    }
}
const createList = (n: number, attrs?: Partial<Item<Tags>>): Item<Tags>[] => {
    return Array.from({length: n}).map(() => create(attrs))
}
const createResources = ({
                             perPage = 10,
                             page = 1,
                             count = 10
                         }, attrs?: Partial<Item<Tags>>): Resources<Item<Tags>, Pager> => {
    return {
        resources: createList(perPage, attrs),
        pager: {
            page,
            per_page: perPage,
            count
        }
    }
}
export const mockItem: MockMethod = {
    url: '/api/v1/item',
    method: 'get',
    timeout: 5000,
    response: ({query}: ResponseParams): Resources<Item<Tags>, Pager> => {
        return createResources({page: parseInt(query.page), count: 100, perPage: 10})
    }
}