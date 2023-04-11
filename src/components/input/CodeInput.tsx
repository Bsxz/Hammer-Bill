import React from 'react'

export const CodeInput: React.FC<InputProps> = props =>
  (
        <div>
            <span>{props.lable}</span>
            <div>
                <input type={props.type} placeholder={props.placeholder} value={props.value}
                       onChange={e => props.onChange?.(e.target.value)} />
                <button></button>
            </div>
            <span>{props.errorMessage || ''}</span>
        </div>
  )
