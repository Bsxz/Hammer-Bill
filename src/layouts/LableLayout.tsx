import React, {useState} from 'react'
import styled from 'styled-components'
import {Input} from '../components/Input'
import {usePopup} from '../hooks/usePopup'
import {time} from '../lib/time'
import {validate} from '../lib/validata'

const Box = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;

  > span {
    text-align: center;
    margin-top: 26px;
    user-select: none;
  }

  > div {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    &:nth-last-child(2) {
      flex-grow: 1;
      flex-shrink: 1;

      span {
        height: 22px;
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

    .error {
      font-size: 14px;
      height: 14px;
      color: red;
      margin-bottom: 16px;
    }
  }

`

interface Props {
    text: string
}

export const LableLayout: React.FC<Props> = ({text}) => {
    const [name, setName] = useState('')
    const [tags, setTags] = useState('')
    const [onStart, setOnstart] = useState(0)
    const {popup, toggle} = usePopup()
    const error = validate({name, length: name.length},
        [
            {key: 'name', type: 'chinese', message: '请输入中文'},
            {key: 'length', type: 'length', min: 0, max: 4, message: '标签名过长'}
        ]
    )
    return (
        <>
            {popup}
            <Box>
                <Input lable="标签名" placeholder="2到4个汉字" value={name} onChange={value => setName(value)}
                       errorMessage={error.name || error.length} />
                <Input lable={`符号  ${tags}`} type="emoji" onChange={v => setTags(v)} />
                <span onTouchStart={() => {
                    setOnstart(time().seconds)
                }}
                      onTouchEnd={() => {
                          if (time().seconds - onStart >= 3 && time().seconds - onStart <= 8) toggle()
                      }}
                >{text}</span>
            </Box>
        </>
    )
}
