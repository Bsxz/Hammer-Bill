import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Icon} from '../components/Icon'
import {RangePick} from '../components/RangePick'
import {StyledGradient} from '../components/StyledGradient'
import {TopNav} from '../components/TopNav'
import type {Range, Ranges} from '../stores/useSelectStore'
import {useSelectStore} from '../stores/useSelectStore'
import {Custom} from './rangesPage/Custom'
import {LastMonth} from './rangesPage/LastMonth'
import {ThisYear} from './rangesPage/ThisYear'
import {SpendingCharts} from './SpendingCharts'

export const StatisticalPage: React.FC = () => {
    const {select, onChange} = useSelectStore()
    const nav = useNavigate()
    const ranges: Ranges<Range> = [
        {key: 'thisMonth', text: '本月', element: <SpendingCharts />},
        {key: 'lastMonth', text: '上月', element: <LastMonth />},
        {key: 'thisYear', text: '今年', element: <ThisYear />},
        {key: 'custom', text: '自定义时间', element: <Custom />}
    ]
    return (
        <>
            <StyledGradient>
                <TopNav title="统计图表" icon={
                    <Icon name="back" w="42" h="42" y="-4" onClick={() => nav(-1)} />
                } />
                <RangePick select={select} onClick={onChange} tabs={ranges} />
            </StyledGradient>
            <div>
                {ranges ? ranges.filter(v => v.key === select)[0].element : null}
            </div>
        </>
    )
}
