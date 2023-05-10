import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const CodeButton = styled.button`
  background-color: #ccc !important;
`
export const CodeInput: React.FC<InputProps> = (props) => {
    const [countdown, setCountdown] = useState(60)
    const { lable, type, placeholder, value, requst, startCount, setStartCount } = props
    useEffect(() => {
        if (!startCount)
            return
        const timer = setInterval(() => {
            setCountdown(c => c - 1)
        }, 1000)
        if (countdown === 0) {
            clearInterval(timer)
            setStartCount?.(false)
            setCountdown(60)
        }
        return () => clearInterval(timer)
    }, [startCount, countdown])
    return (
        <div>
            <span>{lable}</span>
            <div>
                <input type={type} placeholder={placeholder} value={value}
                    onChange={e => props.onChange?.(e.target.value)} />
                {startCount
                    ? <CodeButton disabled={startCount}>{countdown}</CodeButton>
                    : <button type="button" onClick={requst}>发送验证码</button>}
            </div>
            <span>{props.errorMessage || ''}</span>
        </div>
    )
}
