import React from 'react'
import {AddFloutButton} from '../components/AddFloutButton'
import {Icon} from '../components/Icon'
import {RangePick} from '../components/RangePick'
import {StyledGradient} from '../components/StyledGradient'
import {TopMenu} from '../components/TopMenu'
import {TopNav} from '../components/TopNav'
import {useMenuStore} from '../stores/useMenuStore'
import type {Range, Ranges} from '../stores/useSelectStore'
import {useSelectStore} from '../stores/useSelectStore'
import {Custom} from './rangesPage/Custom'
import {LastMonth} from './rangesPage/LastMonth'
import {ThisMonth} from './rangesPage/ThisMonth'
import {ThisYear} from './rangesPage/ThisYear'

const ranges: Ranges<Range> = [
    {key: 'thisMonth', text: '本月', element: <ThisMonth />},
    {key: 'lastMonth', text: '上月', element: <LastMonth />},
    {key: 'thisYear', text: '今年', element: <ThisYear />},
    {key: 'custom', text: '自定义时间', element: <Custom />}
]
export const ItemsPage: React.FC = () => {
    const {select, onChange} = useSelectStore()
    const {visible, start, setVisible, setStart} = useMenuStore()
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
            <div>
                {ranges ? ranges.filter(v => v.key === select)[0].element : null}
            </div>
            <AddFloutButton />
        </>
    )
}
