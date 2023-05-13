import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

let id = 0
function createId() {
  return id += 1
}
function create(attrs?: Partial<Tag>): Tag {
  return {
    id: createId(),
    user_id: faker.datatype.number(),
    name: faker.lorem.word().slice(0, 5),
    sign: faker.internet.emoji(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    deleted_at: null,
    kind: 'expenses',
    ...attrs
  }
}
function createList(n: number, attrs?: Partial<Tag>): Tag[] {
  return Array.from({ length: n }).map(() => create(attrs))
}
function createResources({
  perPage = 10,
  count = 10,
  page = 1,
}, attrs?: Partial<Tag>): Resources<Tag> {
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
  {
    url: '/api/v1/tags/:id',
    method: 'get',
    statusCode: 200,
    response: ({ query }: ResponseParams): Resource<Tag> => {
      return { resource: create(query as Partial<Tag>) }
    }
  },
  {
    url: '/api/v1/tags/:id',
    method: 'patch',
    statusCode: 200,
    response: ({ query }: ResponseParams): Resource<Tag> => {
      return { resource: create(query as Partial<Tag>) }
    }
  },
  {
    url: '/api/v1/tags/:id',
    method: 'delete',
    statusCode: 200,
    response: () => {
      return '200 OK'
    }
  }
]
