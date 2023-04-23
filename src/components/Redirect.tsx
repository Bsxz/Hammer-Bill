import React from 'react'
import {Navigate, useRouteError} from 'react-router-dom'
import {ErrorUnauthorized} from '../errors'
import {NotFound} from '../pages/NotFound'

export const Redirect: React.FC = () => {
    const error = useRouteError() as Error
    if (error instanceof ErrorUnauthorized) {
        return <Navigate to="/login" />
    } else {
        return <NotFound />
    }
}
