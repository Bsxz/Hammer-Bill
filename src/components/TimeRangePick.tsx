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
export const TimeRangePick: React.FC<Selected> = ({timeRanges, selected, onSelected}) => {
    return (
        <Ol>
            {timeRanges.map(k => <li key={k.key}
                                     style={k.key === selected ? {borderColor: '#a8bf8f'} : {borderColor: 'transparent'}}
                                     onClick={e => onSelected(k.key)}>
                {k.text}</li>)}
        </Ol>
    )
}
