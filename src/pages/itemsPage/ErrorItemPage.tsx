import React from 'react'
import { Navigate, useRouteError } from 'react-router-dom'
import { ErrorDataEmpty } from '../../errors'
import { NotFound } from '../NotFound'

export const ErrorItemPage: React.FC = () => {
    const error = useRouteError() as Error
    if (error instanceof ErrorDataEmpty)
        return <Navigate to="/itemspage/new" />
    return <NotFound />
}
