import type { FormEventHandler } from 'react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'
import { hasError, validate } from '../../lib/validata'
import { useTagFormStore } from '../../stores/useTagFormStore'
import { useTags } from '../../stores/useTags'
import { useAjax } from '../../api/ajax'

const Form = styled.form`
  flex-grow: 1;
  flex-shrink: 1;
  height: 320px;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;

  > span {
    margin-bottom: 14px;
    text-align: center;
    margin-top: 10px;
    user-select: none;
  }

  div:nth-of-type(2) {
    flex-grow: 1;
    flex-shrink: 1;
    > span {
      line-height: 35px;
      height: 35px;
    }
  }

  > div {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    > span {
      margin-top: 10px;
      > span {
        font-size: 26px;
      }
    }

    &:nth-last-child(2) {
      flex-grow: 1;
      flex-shrink: 1;

      > span {
        height: 22px;
        font-size: 26px;
        flex-grow: 0;
        flex-shrink: 0;
      }
    }

    input {
      font-size: 18px;
      height: 48px;
      padding: 16px;
      border-radius: 8px;
    }
  }

`
const Button = styled.button`
  flex-grow: 0;
  flex-shrink: 0;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  line-height: 48px;
  color: #fff;
  background-color: var(--bgcolor2);
`

interface Props {
  text: string
  btntitle: string
  kind?: Tag['kind']
}

export const TagsForm: React.FC<Props> = ({ text, btntitle, kind }) => {
  const nav = useNavigate()
  const { post } = useAjax()
  const { data, error, setError, setData } = useTagFormStore()
  const { expensesTags, incomeTags, setExpensesTags, setIncomeTags } = useTags()
  const tags = kind === 'expenses' ? expensesTags : incomeTags
  const setTags = kind === 'expenses' ? setExpensesTags : setIncomeTags
  const [onStart, setOnstart] = useState(0)
  const { popup, toggle } = usePopup()
  useEffect(() => {
    setData({ kind })
    return () => {
      setData({ name: '', kind: 'expenses', sign: '' })
      setError({ name: [], kind: [], sign: [] })
    }
  }, [])
  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const newError = validate({ name: data.name, kind: data.kind, sign: data.sign, length: data.name.length },
      [
        { key: 'name', type: 'chinese', message: '请输入中文' },
        { key: 'name', type: 'required', message: '请输入标签名' },
        { key: 'name', type: 'length', max: 4, message: '标签名过长' },
        { key: 'sign', type: 'required', message: '未选择sign图标' },
        { key: 'kind', type: 'required', message: '图标类型不明' }
      ]
    )
    setError(newError)
    if (!hasError(newError)) {
      const newTags = tags
      newTags.push(data)
      setTags(newTags)
      post('/api/v1/tags', data)
      nav(-1)
    }
  }
  return (
    <>
      {popup}
      <Form onSubmit={submit}>
        <Input lable="标签名" placeholder="2到4个汉字" value={data.name}
          onChange={value => value.length <= 4 && setData({ name: value })}
          errorMessage={error.name?.[0]} />
        <Input lable={'符号'} sign={data.sign} type="emoji" onChange={v => setData({ sign: v })}
          errorMessage={error.sign?.[0]} />
        <span onTouchStart={() => {
          setOnstart(time().seconds)
        }}
          onTouchEnd={() => {
            if (time().seconds - onStart >= 3 && time().seconds - onStart <= 8)
              toggle()
          }}
        >{text}</span>
        <Button>{btntitle}</Button>
      </Form>
    </>
  )
}
