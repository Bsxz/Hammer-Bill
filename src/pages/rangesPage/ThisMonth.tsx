import React from 'react'
import {TopMenu} from '../../components/TopMenu'
import {useMenuStore} from '../../stores/useMenuStore'
import {ItemsList} from '../itemsPage/ItemsList'
import {ItemsSummary} from '../itemsPage/ItemsSummary'

export const ThisMonth: React.FC = () => {
    const {visible, start, setVisible, setStart} = useMenuStore()
    return (
        <>
            <ItemsSummary />
            <ItemsList />
            <TopMenu onMaskVisible={() => {
                if (!start)
                    setVisible(!visible)
            }} visible={visible} setStart={setStart} />
        </>
    )
}
