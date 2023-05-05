import React from 'react'
import { Navigate, useRouteError } from 'react-router-dom'
import useSWR from 'swr'
import { ErrorUnauthorized } from '../errors'
import { NotFound } from '../pages/NotFound'
import { useAjax } from '../api/ajax'

export const Redirect: React.FC = () => {
    const { get } = useAjax()
    const error = useRouteError() as Error
    useSWR('https://mangosteen2.hunger-valley.com/api/v1/me',
        async path => (await get<Resource<User>>(path)).data)
    if (error instanceof ErrorUnauthorized)
        return <Navigate to="/login" />
    else return <NotFound />
}
