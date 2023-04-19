import React, {FormEventHandler} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {Icon} from '../components/Icon'
import {RangePick} from '../components/RangePick'
import {StyledGradient} from '../components/StyledGradient'
import {StyledKeyBoard} from '../components/StyledKeyBoard'
import {TabsItem} from '../components/TabsItem'
import {TagsItem} from '../components/TagsItem'
import {TopNav} from '../components/TopNav'
import {hasError, validate} from '../lib/validata'
import {useCreateItemStore} from '../stores/useCreateItemStore'
import {Range, Ranges} from '../stores/useSelectStore'

const Form = styled.form`
  height: calc(100vh - var(--vh-offset, 0px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
export const ItemsNewPage: React.FC = () => {
    const {data, error, setData, setError} = useCreateItemStore()
    const nav = useNavigate()
    const tabs: Ranges<Range> = [
        {key: 'expenses', text: '支出', element: <TagsItem kind="expenses" />},
        {key: 'income', text: '收入', element: <TagsItem kind="income" />}
    ]
    const back = () => {
        nav(-1)
    }
    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const newError = validate(data, [
            {key: 'kind', type: 'required', message: '请填写收入信息'},
            {key: 'happen_at', type: 'required', message: '请填写收入信息'},
            {key: 'tag_ids', type: 'required', message: '请填写收入信息'},
            {key: 'amount', type: 'required', message: '请填写收入信息'}
        ])
        setError(newError)
        console.log(data)
        if (hasError(error)) return
    }
    return (
        <Form onSubmit={submit}>
            <StyledGradient>
                <TopNav title="记一笔" icon={
                    <Icon name="back" w="36" h="36" onClick={back} />
                } />
                <RangePick select={data.kind} tabs={tabs} data={data} onChange={setData} />
            </StyledGradient>
            <TabsItem data={data} setData={setData} />
            <StyledKeyBoard />
        </Form>
    )
}
