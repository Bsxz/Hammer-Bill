import React from 'react'

export const TextInput: React.FC<InputProps> = (props) => {
  return (
        <div>
            <span>{props.lable}</span>
            <input type={props.type} placeholder={props.placeholder} value={props.value}
                   onChange={e => props.onChange?.(e.target.value)} />
            <span className="error">{props.errorMessage || ''}</span>
        </div>
  )
}
