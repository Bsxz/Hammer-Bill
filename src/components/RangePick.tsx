import React from 'react'
import styled from 'styled-components'
import type {Selected} from '../stores/useSelectStore'

const Ol = styled.ol`
  display: flex;
  font-size: 1.1rem;
  color: #fff;

  li {
    text-align: center;
    flex-grow: 1;
    padding: 11px 22px;
    border-bottom: 3px solid transparent;
    -webkit-tap-highlight-color: transparent;
  }
`
export const RangePick = <T extends string>(props: Partial<Selected<T>>) => {
    const {ranges, select, onChange} = props
    return (
        <Ol>
            {ranges?.map(k => <li key={k.key}
                                  style={k.key === select ? {borderColor: '#a8bf8f'} : {borderColor: 'transparent'}}
                                  onClick={e => onChange?.(k.key)}>
                {k.text}</li>)}
        </Ol>
    )
}
