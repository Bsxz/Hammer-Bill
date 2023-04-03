import React from 'react'

declare global {
    var isDev: boolean

    interface Resource<T> {
        resource: T
    }

    interface Resources<T, P> {
        resources: T[]
        pager: P
    }

    interface User {
        id: number
        email: string
        name?: string
        created_at: string
        updated_at: string
    }

    interface Tags {
        id: number,
        user_id: number,
        name: string,
        sign: string,
        deleted_at?: string,
        created_at: string,
        updated_at: string,
        kind: expenses | incomes
    }

    interface Item<T> {
        id: number
        user_id: number
        amount: number
        note?: string
        tag_ids: number[]
        happen_at: string
        created_at: string
        updated_at: string
        kind: expenses | incomes
        deleted_at?: string
        tags: T[]
    }

    interface Pager {
        page: number
        per_page: number
        count: number
    }

    interface Props {
        onClick?: (e: React.MouseEvent) => void
        visible?: boolean
    }
}
