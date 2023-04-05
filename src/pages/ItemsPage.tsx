import React from 'react'
import {AddFloutButton} from '../components/AddFloutButton'
import {Icon} from '../components/Icon'
import {StyledGradient} from '../components/StyledGradient'
import {TimeRangePick} from '../components/TimeRangePick'
import {TopMenu} from '../components/TopMenu'
import {TopNav} from '../components/TopNav'
import {useMenuStore} from '../stores/useMenuStore'
import {useSelectStore} from '../stores/useSelectStore'
import {ItemsList} from './itemsPage/ItemsList'
import {ItemsSummary} from './itemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
    const {selected, onSelected} = useSelectStore()
    const {visible, start, setVisible, setStart} = useMenuStore()
    return (
        <>
            <StyledGradient>
                <TopNav title="大锤记账" icon={
                    <Icon name="menu" w="42" h="42" x="-10" y="-4" onClick={() => {
                        if (!start) setVisible(!visible)
                    }} />
                } />
                <TimeRangePick selected={selected} onSelected={onSelected} />
            </StyledGradient>
            <ItemsSummary />
            <ItemsList />
            <AddFloutButton />
            <TopMenu onMaskVisible={() => {
                if (!start)
                    setVisible(!visible)
            }} visible={visible} setStart={setStart} />
        </>
    )
}
