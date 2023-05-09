import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { emojis } from '../../lib/emoji'
const EmojiBox = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  height: 260px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  row-gap: 8px;
  border: 1px solid #000;
  border-radius: 8px;
  overflow: auto;
  user-select: none;

  ol {
    display: flex;
    padding-left: 8px;
    column-gap: 16px;
    white-space: nowrap;
    color: #999999;
    overflow: auto;
    > li {
      cursor: pointer;
      padding-bottom: 8px;
      border-bottom: 1px solid transparent;
    }
  }

  > div {
    display: grid;
    justify-content: center;
    grid-template: repeat(auto-fill, 26px)/repeat(auto-fill, 26px);
    gap: 18px;
    height: 100%;
    padding-right: 9px;
    overflow: auto;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 38px;
      height: 38px;
      border-radius: 8px;

      > span {
        font-size: 26px;
      }
    }
  }
`
export const EmojiInput: React.FC<InputProps> = (props) => {
  const { lable, onChange, errorMessage } = props
  const [select, setSelect] = useState('表情')
  const [emoji, setEmoji] = useState(emojis.filter(({ name }) => name === select)[0].chars[0])
  useEffect(() => {
    onChange?.(emoji)
  }, [])
  return (
    <div>
      <span>{lable}  <span>{props.sign}</span></span>
      <EmojiBox>
        <ol>
          {emojis.map(({ name }) => <li key={name}
            onClick={(e: any) => {
              setEmoji(emojis.filter(({ name }) => name === e.target.innerHTML)[0].chars[0])
              onChange?.(emojis.filter(({ name }) => name === e.target.innerHTML)[0].chars[0])
              setSelect(name)
            }}
            style={{
              color: name === select ? '#000' : '#999',
              borderColor: name === select ? '#74b9ff' : 'transparent'
            }}>{name}</li>)}
        </ol>
        {emojis.map(({ name, chars }) => (name === select
          ? <div key={name}>{chars.map(v =>
            <div key={v} style={{ backgroundColor: emoji === v ? 'rgba(0,0,0,.1)' : 'transparent' }}>
              <span onClick={() => {
                setEmoji(v)
                onChange?.(v)
              }}>{v}</span>
            </div>
          )}
          </div>
          : null)
        )}
      </EmojiBox>
      <span className="error">{errorMessage}</span>
    </div>
  )
}
