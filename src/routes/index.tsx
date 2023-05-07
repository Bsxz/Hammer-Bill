import type { AxiosError } from 'axios'
import axios from 'axios'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import { preload } from 'swr'
import { Redirect } from '../components/Redirect'
import { Root } from '../components/Root'
import { ErrorDataEmpty, ErrorUnauthorized } from '../errors'
import { ExportPage } from '../pages/ExportPage'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { ItemsPage } from '../pages/ItemsPage'
import { ErrorItemPage } from '../pages/itemsPage/ErrorItemPage'
import { LoginPage } from '../pages/LoginPage'
import { RemindPage } from '../pages/RemindPage'
import { StatisticalPage } from '../pages/StatisticalPage'
import { TagsEditPage } from '../pages/TagsEditPage'
import { TagsNewPage } from '../pages/TagsNewPage'
import { TagsPage } from '../pages/TagsPage'
import { Home } from '../pages/Home'
import { WelComeRoutes } from './welComeRoutes'

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <Root />
            },
            WelComeRoutes,
            {
                path: 'login',
                element: <LoginPage />
            }
        ]
    },
    {
        path: '/',
        element: <Outlet />,
        errorElement: <Redirect />,
        loader: async () => {
            const onError = (error: AxiosError) => {
                if (error.response && error.response.status === 401)
                    throw new ErrorUnauthorized()
                throw error
            }
            return preload('https://mangosteen2.hunger-valley.com/api/v1/me', async (path) => {
                const response = await axios.get<Resources<Item>>(path)
                    .catch(onError)
                return response.data
            })
        },
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'items',
                element: <ItemsPage />,
                errorElement: <ErrorItemPage />,
                loader: async () => {
                    return preload('/api/v1/items?page=1', async (path) => {
                        const response = await axios.get<Resources<Item>>(path)
                        if (response.data.resources.length > 0)
                            return response.data

                        else
                            throw new ErrorDataEmpty()
                    })
                }
            },
            {
                path: '/itemspage/new',
                element: <ItemsNewPage />
            },
            {
                path: 'tags/new',
                element: <TagsNewPage />
            },
            {
                path: 'tags/:id',
                element: <TagsEditPage />
            },
            {
                path: 'lablenew',
                element: <TagsNewPage />
            },
            {
                path: 'lableupdate',
                element: <TagsEditPage />
            },
            {
                path: 'statistical',
                element: <StatisticalPage />
            },
            {
                path: 'export',
                element: <ExportPage />
            },
            {
                path: 'tags',
                element: <TagsPage />
            },
            {
                path: 'remind',
                element: <RemindPage />
            }
        ]
    }
])
