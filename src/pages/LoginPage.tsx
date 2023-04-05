import React, {FormEventHandler} from 'react'
import styled from 'styled-components'
import {ajax} from '../api/ajax'
import {Header} from '../components/Header'
import {Icon} from '../components/Icon'
import {StyledGradient} from '../components/StyledGradient'
import {TopNav} from '../components/TopNav'
import {hasError, validate} from '../lib/validata'
import {useLoginStore} from '../stores/useLoginStore'

interface FromData {
    data: Data
}

interface Data {
    email: string
    code: string
}

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

      &:after {
        display: inline-block;
        content: '登入';
      }

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

        &:after {
          content: '发送验证码';
        }
      }
    }
  }
`
export const LoginPage: React.FC = () => {
    const {data, error, setData, setError} = useLoginStore()
    const send: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const error = validate(data, [
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
            },
            {
                key: 'code',
                type: 'required',
                message: '请输入验证码'
            },
            {
                key: 'code',
                type: 'length',
                length: 6,
                message: '验证码错误'
            }
        ])
        setError(error)
        if (!hasError(error)) {
            const a = (await ajax.post('/api/v1/session', data))
            console.log(a)
        }
    }
    return (
        <>
            <StyledGradient>
                <TopNav title="登入" icon={
                    <Icon name="back" w="36" h="36" />
                } />
            </StyledGradient>
            <Header color="var(--bgcolor1)" />
            <Form onSubmit={send}>
                <div>
                    <span>邮箱地址</span>
                    <input type="text" placeholder="请输入邮箱，然后点击发送验证码" value={data.email}
                           onChange={e => setData({email: e.target.value})} />
                    {error.email ? <span>{error.email}</span> : <span></span>}
                </div>
                <div>
                    <span>验证码</span>
                    <div>
                        <input type="text" placeholder="请输入验证码" value={data.code}
                               onChange={e => setData({code: e.target.value})} />
                        <button></button>
                    </div>
                    {error.code ? <span>{error.code}</span> : <span></span>}
                </div>
                <div>
                    <button type="submit"></button>
                </div>
            </Form>
        </>
    )
}
