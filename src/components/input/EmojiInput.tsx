import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {emojis} from '../../lib/emoji'

const EmojiBox = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  height: 200px;
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
    column-gap: 16px;
    white-space: nowrap;
    color: #999999;
    overflow: auto;
  }

  > div {
    display: grid;
    justify-content: center;
    grid-template: repeat(auto-fill, 34px)/repeat(auto-fill, 34px);
    column-gap: 6px;
    row-gap: 6px;
    height: 100%;
    overflow: auto;

    > div {
      width: 26px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border: 1px solid transparent;
      border-radius: 8px;

      > span {
        display: inline-block;
        border-radius: 4px;
        width: 22px;
        height: 20px;
      }
    }
  }
`
export const EmojiInput: React.FC<InputProps> = (props) => {
    const {lable, onChange} = props
    const [select, setSelect] = useState('表情')
    const [emoji, setEmoji] = useState(emojis.filter(({name}) => name === select)[0].chars[0])
    useEffect(() => {
        onChange?.(emoji)
    }, [])
    return (
        <div>
            <span>{lable}</span>
            <EmojiBox>
                <ol>
                    {emojis.map(({name}) => <li key={name}
                                                onClick={(e: any) => {
                                                    setEmoji(emojis.filter(({name}) => name === e.target.innerHTML)[0].chars[0])
                                                    onChange?.(emojis.filter(({name}) => name === e.target.innerHTML)[0].chars[0])
                                                    setSelect(name)
                                                }}
                                                style={{color: name === select ? '#000' : '#999'}}>{name}</li>)}
                </ol>
                {emojis.map(({name, chars}) => (name === select ?
                    <div key={name}>{chars.map((v) =>
                        <div key={v}>
                            <span style={{backgroundColor: emoji === v ? 'rgba(0,0,0,.5)' : 'transparent'}}
                                  onClick={() => {
                                      setEmoji(v)
                                      onChange?.(v)
                                  }
                                  }>{v}</span>
                        </div>
                    )}
                    </div> : null)
                )}
            </EmojiBox>
        </div>
    )
}
