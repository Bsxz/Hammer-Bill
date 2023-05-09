import React from 'react'
import { CodeInput } from './input/CodeInput'
import { EmojiInput } from './input/EmojiInput'
import { TextInput } from './input/TextInput'
// 请输入邮箱，然后点击发送验证码
export const Input: React.FC<InputProps> = (props) => {
  const { type = 'text' } = props
  const render = (type: string) => {
    switch (type) {
      case 'text': {
        return <TextInput {...props} />
      }
      case 'code': {
        return <CodeInput {...props} />
      }
      case 'emoji': {
        return (
          <EmojiInput {...props} />
        )
      }
    }
  }
  return (
    <>
      {render(type)}
    </>
  )
}
