import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../../components/Icon'

const Div = styled.div``
export const Spending: React.FC = () => {
    return (
        <Div>
            <ol>
                <li>
                    <Link to="/tags/new?kind=expenses"><Icon name="add" w="32" h="32" fill={'var(--bgcolor1)'} /></Link>
                </li>
                {Array.from({ length: 40 }).map((v, i) =>
                    <li key={i}>
                        <Icon name="flight" w="32" h="32" />
                        <span>打车</span>
                    </li>
                )}
            </ol>
        </Div>
    )
}
