import React, {ReactNode} from 'react'
import styled from 'styled-components'

interface Props {
    title: string
    icon: ReactNode
}

const Div = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 0 10px 22px;
  color: #fff;

  div {
    width: 40px;
    height: 32px;
    line-height: 32px;
  }

  span {
    font-size: 24px;
    font-weight: 100;
    margin-left: 20px;
  }
`
export const TopNav: React.FC<Props> = ({title, icon}) => {
    return (
        <Div>
            <div>{icon}</div>
            <span>{title}</span>
        </Div>
    )
}
