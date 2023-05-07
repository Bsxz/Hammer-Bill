import { FormEventHandler, useState } from 'react'
import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../components/Icon'
import { RangePick } from '../components/RangePick'
import { StyledGradient } from '../components/StyledGradient'
import { StyledKeyBoard } from '../components/StyledKeyBoard'
import { TabsItem } from '../components/TabsItem'
import { TopNav } from '../components/TopNav'
import { hasError, validate } from '../lib/validata'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import type { Range, Ranges } from '../stores/useSelectStore'
import { useAjax } from '../api/ajax'

const Form = styled.form`
  height: calc(100vh - var(--vh-offset, 0px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
export const ItemsNewPage: React.FC = () => {
    const { data, setData, setError } = useCreateItemStore()
    const { post } = useAjax()
    const [newData, setNewData] = useState(data)
    const nav = useNavigate()
    const tabs: Ranges<Range> = [
        { key: 'expenses', text: '支出', element: <div></div> },
        { key: 'income', text: '收入', element: <div></div> },
    ]
    useEffect(() => {
        setNewData(() => ({ ...data, amount: parseFloat(data.amount as string) * 100 }))
    }, [data])
    useEffect(() => {
        setData({ kind: 'expenses' })
    }, [])
    const back = () => {
        nav(-1)
    }
    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const newError = validate(data, [
            { key: 'kind', type: 'required', message: '请填写收入信息' },
            { key: 'happen_at', type: 'required', message: '请填写收入信息' },
            { key: 'tag_ids', type: 'length', min: 1, message: '请选择emoji' },
            { key: 'amount', type: 'notEqual', value: 0, message: '请输入金额' },
        ])
        setError(newError)
        if (hasError(newError)) {
            alert(Object.values(newError)[0])
            return
        }
        post('/api/v1/items', newData)
        nav('/items')
    }
    return (
        <Form onSubmit={submit}>
            <StyledGradient>
                <TopNav
                    title="记一笔"
                    icon={<Icon name="back" w="36" h="36" onClick={back} />}
                />
                {/* {error ? Object.values(error)[0] : null} */}
                <RangePick
                    select={data.kind}
                    tabs={tabs}
                    data={data}
                    onChange={setData}
                />
            </StyledGradient>
            <TabsItem data={data} setData={setData} />
            <StyledKeyBoard data={data} setData={setData} />
        </Form>
    )
}
