import React, {useState} from 'react'
import styled from 'styled-components'
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

  div {
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    input {
      font-size: 18px;
      height: 48px;
      padding: 16px;
      border-radius: 8px;
    }

    span:nth-last-child(1) {
      font-size: 14px;
      height: 14px;
      color: red;
      margin-bottom: 16px;
    }
  }
`
const EmojiBox = styled.div`
  padding: 12px;
  border: 1px solid #000;
  border-radius: 8px;
  height: 420px;

  ol {
    display: flex;
    column-gap: 16px;
    white-space: nowrap;
    overflow: auto;
    color: #999999;
  }
`
const table = ['表情', '手势', '职业', '衣服', '动物', '自然', '食物', '运动']
export const LableLayout: React.FC = () => {
    const [select, setSelect] = useState('表情')
    const [name, setName] = useState('')
    const error = validate({name, length: name.length},
        [
            {key: 'name', type: 'chinese', message: '请输入中文'},
            {key: 'length', type: 'length', min: 0, max: 4, message: '标签名过长'}
        ]
    )
    return (
        <>
            <Box>
                <div>
                    <span>标签名</span>
                    <input type="text" placeholder="2到4个汉字"
                           onChange={e => setName(e.target.value)} value={name} />
                    <span style={{visibility: error ? 'visible' : 'hidden'}}>{error.name || error.length}</span>
                </div>
                <div>
                    <span>符号</span>
                    <EmojiBox>
                        <ol>
                            {table.map(v => <li key={v}
                                                onClick={() => {
                                                    setSelect(v)
                                                }}
                                                style={{color: v === select ? '#000' : '#999'}}>{v}</li>)}
                        </ol>
                    </EmojiBox>
                </div>
                <span onTouchMove={() => {
                    console.log(`正在被点击`)
                }}>记账时长按标签，即可进行编辑</span>
            </Box>
        </>
    )
}
