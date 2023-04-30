import type { FormEventHandler } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAjax } from '../api/ajax'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { StyledGradient } from '../components/StyledGradient'
import { TopNav } from '../components/TopNav'
import { hasError, validate } from '../lib/validata'
import { useLoginStore } from '../stores/useLoginStore'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  row-gap: 8px;

  > div {
    font-size: 18px;
    display: flex;
    width: 92vw;
    flex-direction: column;
    row-gap: 8px;

    span:nth-last-child(1) {
      color: red;
      height: 24px;
    }

    input {
      height: 48px;
      font-size: inherit;
      border-radius: 8px;
      border: 1px solid var(--bgcolor1);

      &:focus {
        box-shadow: inset 0px 1px 3px 0px var(--shadowColor);
      }
    }

    button {
      font-size: inherit;
      height: 48px;
      border-radius: 8px;
      color: #fff;
      background-color: var(--bgcolor2);

      &:active {
        &:after {
          transform: translateY(1px);
          opacity: .8;
        }
      }
    }

    > div {
      display: flex;
      column-gap: 20px;

      input {
        width: 120px;
      }

      button {
        flex-grow: 1;
      }
    }
  }
`
export const LoginPage: React.FC = () => {
  const { post } = useAjax()
  const { data, error, setData, setError } = useLoginStore()
  const [startCount, setStartCount] = useState(false)
  const nav = useNavigate()
  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      {
        key: 'code',
        type: 'required',
        message: '请输入验证码'
      },
      {
        key: 'code',
        type: 'length',
        max: 6,
        message: '验证码错误'
      }
    ])
    setError(newError)
    if (!hasError(newError)) {
      const { data: { jwt } } = await post<{ jwt: string }>('https://mangosteen2.hunger-valley.com/api/v1/session', data).catch((error) => {
        throw new Error(error)
      })
      window.localStorage.setItem('jwt', jwt)
      nav('/home')
    }
  }
  const sendCode = async () => {
    const newError = validate(data, [
      {
        key: 'email',
        type: 'required',
        message: '请输入邮箱地址'
      },
      {
        key: 'email',
        type: 'pattern',
        regex: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        message: '邮箱地址格式不正确'
      }])
    setError(newError)
    if (hasError(newError))
      return
    const { status } = await post('https://mangosteen2.hunger-valley.com/api/v1/validation_codes', data)
    if (status === 200)
      setStartCount(true)
  }
  return (
    <>
      <StyledGradient>
        <TopNav title="登入" icon={
          <Icon name="back" w="36" h="36" />
        } />
      </StyledGradient>
      <Header color="var(--bgcolor1)" />
      <Form onSubmit={submit}>
        <Input lable="邮箱地址" placeholder="请输入邮箱，然后点击发送验证码" value={data.email}
          onChange={value => setData({ email: value })} errorMessage={error.email} />
        <Input lable="验证码" type="code" placeholder="请输入验证码" value={data.code}
          requst={sendCode} startCount={startCount} setStartCount={setStartCount}
          onChange={value => value.length <= 6 && setData({ code: value })}
          errorMessage={error.code} />
        <div>
          <button type="submit">登入</button>
        </div>
      </Form>
    </>
  )
}
