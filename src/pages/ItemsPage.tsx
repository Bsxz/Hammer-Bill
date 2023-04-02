import React from 'react'
import styled from 'styled-components'
import {AddFloutButton} from '../components/AddFloutButton'
import {TimeRangePick} from '../components/TimeRangePick'
import {TopNav} from '../components/TopNav'
import {useSelectStore} from '../stores/useSelectStore'
import {ItemsList} from './itemsPage/ItemsList'
import {ItemsSummary} from './itemsPage/ItemsSummary'

const Div = styled.div`
  background: linear-gradient(180deg, #4f6f46, #779649);
`
export const ItemsPage: React.FC = () => {
    const {selected, onSelected} = useSelectStore()
    return (
        <>
            <Div>
                <TopNav />
                <TimeRangePick selected={selected} onSelected={onSelected} />
            </Div>
            <ItemsSummary />
            <ItemsList />
            <AddFloutButton />
        </>
    )
}
