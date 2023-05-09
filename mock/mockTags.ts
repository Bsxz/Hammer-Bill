import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

let id = 0
const createId = () => {
  return id += 1
}
const create = (attrs?: Partial<Tag>): Tag => {
  return {
    id: createId(),
    user_id: faker.datatype.number(),
    name: '起飞',
    sign: faker.internet.emoji(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    deleted_at: null,
    kind: 'expenses',
    ...attrs
  }
}
const createList = (n: number, attrs?: Partial<Tag>): Tag[] => {
  return Array.from({ length: n }).map(() => create(attrs))
}
const createResources = ({
  perPage = 10,
  count = 10,
  page = 1,
}, attrs?: Partial<Tag>): Resources<Tag> => {
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
export const mockTags: MockMethod[] = [
  {
    url: '/api/v1/tags',
    method: 'get',
    timeout: 500,
    statusCode: 200,
    response: ({ query }: ResponseParams): Resources<Tag> => {
      return createResources({ page: parseInt(query.page), count: 23, perPage: 50 }, { kind: query.kind as Tag['kind'] })
    }
  },
  {
    url: '/api/v1/tags',
    method: 'post',
    timeout: 500,
    statusCode: 200,
    response: ({ body }: Response): Resource<Tag> => {
      return { resource: create(body as Partial<Tag>) }
    }
  },
  // {
  //   url: '/api/v1/tags',
  //   method: 'post',
  //   timeout: 500,
  //   statusCode: 422,
  //   response: ({ body }: Response): any => {
  //     return {
  //       errors: {
  //         name: ['illegal']
  //       }
  //     }
  //   }
  // }
]
