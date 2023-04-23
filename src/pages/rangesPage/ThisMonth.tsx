import React from 'react'
import {ItemsList} from '../itemsPage/ItemsList'
import {ItemsSummary} from '../itemsPage/ItemsSummary'

export const ThisMonth: React.FC = () => {
    return (
        <>
            <ItemsSummary />
            <ItemsList />
        </>
    )
}
