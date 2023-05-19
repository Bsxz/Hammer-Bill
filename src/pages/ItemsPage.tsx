import React from 'react'
import { AddFloutButton } from '../components/AddFloutButton'
import { Icon } from '../components/Icon'
import { RangePick } from '../components/RangePick'
import { StyledGradient } from '../components/StyledGradient'
import { TopMenu } from '../components/TopMenu'
import { TopNav } from '../components/TopNav'
import { useMenuStore } from '../stores/useMenuStore'
import type { Range, Ranges } from '../stores/useSelectStore'
import { useSelectStore } from '../stores/useSelectStore'
import { Item } from './itemsPage/Item'

const ranges: Ranges<Range> = [
    { key: 'thisMonth', text: '本月' },
    { key: 'lastMonth', text: '上月' },
    { key: 'thisYear', text: '今年' },
    { key: 'afterYear', text: '去年' },
]

export const ItemsPage: React.FC = () => {
    const { select, onChange } = useSelectStore()
    const { visible, start, setVisible, setStart } = useMenuStore()

    return (
        <>
            <StyledGradient>
                <TopNav title="大锤记账" icon={
                    <Icon name="menu" w="42" h="42" x="-10" y="-4" onClick={() => {
                        if (!start)
                            setVisible(!visible)
                    }} />
                } />
                <RangePick tabs={ranges} select={select} onClick={onChange} />
            </StyledGradient>
            <TopMenu onMaskVisible={() => {
                if (!start)
                    setVisible(!visible)
            }} visible={visible} setStart={setStart} />
            <Item kind={select} />
            <AddFloutButton />
        </>
    )
}
