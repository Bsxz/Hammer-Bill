import type { EChartsOption } from 'echarts'
import React, { ReactNode } from 'react'
import { CreateItem } from 'stores/useCreateItemStore'

declare global {
    var isDev: boolean
    type JSONValue = string | number | boolean | null | { [k: string]: JSONValue } | JSONValue[] | CreateItem['data']
    type PatchTag = {
        name: Tag['name']
        sign: Tag['sign']
    }
    interface Resource<T> {
        resource: T
    }

    interface Resources<T> {
        resources: T[]
        pager: Pager
    }

    interface User {
        id: number
        email: string
        name?: string
        created_at: string
        updated_at: string
    }

    interface Tag {
        id: number,
        user_id: number,
        name: string,
        sign: string,
        created_at: string,
        updated_at: string,
        deleted_at?: string | null,
        kind: 'expenses' | 'incomes'
    }

    interface Item {
        id: number
        user_id: number
        amount: number
        note?: string
        tag_ids: number[]
        happen_at: string
        created_at: string
        updated_at: string
        kind: 'expenses' | 'incomes'
        deleted_at?: string
        tags: Tag[]
    }

    interface Pager {
        page: number
        per_page: number
        count: number
    }

    interface Props {
        onMaskVisible: (e: React.MouseEvent) => void
        visible: boolean
        setStart: (start: boolean) => void
        children?: ReactNode
        top?: string
        duration?: number
    }

    interface InputProps {
        lable?: string
        type?: 'text' | 'code' | 'emoji'
        sign?: string
        placeholder?: string
        value?: string
        startCount?: boolean
        setStartCount?: (value: boolean) => void
        onChange?: (value: string) => void
        requst?: () => void
        errorMessage?: string | string[]
    }

    interface ChartProps<T> {
        options?: Partial<EChartsOption>
        data?: T
    }
}
