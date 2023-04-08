import {createHashRouter, Outlet} from 'react-router-dom'
import {Root} from '../components/Root'
import {ChartPage} from '../pages/ChartPage'
import {ExportPage} from '../pages/ExportPage'
import {Home} from '../pages/Home'
import {ItemsNewPage} from '../pages/ItemsNewPage'
import {ItemsPage} from '../pages/ItemsPage'
import {LableNew} from '../pages/LableNew'
import {LableUpdate} from '../pages/LableUpdate'
import {LoginPage} from '../pages/LoginPage'
import {NotFound} from '../pages/NotFound'
import {RemindPage} from '../pages/RemindPage'
import {TagsPage} from '../pages/TagsPage'
import {WelComeRoutes} from './welComeRoutes'

export const Router = createHashRouter([
    {
        path: '/',
        element: <Outlet />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Root />
            },
            WelComeRoutes
        ]
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/itemspage',
        children: [
            {
                index: true,
                element: <ItemsPage />
            },
            {
                path: 'new',
                element: <ItemsNewPage />
            },
            {
                path: 'lablenew',
                element: <LableNew />
            },
            {
                path: 'lableupdate',
                element: <LableUpdate />
            }
        ]
    },
    // {
    //     path: 'new',
    //     element: <ItemsNewPage />,
    //     children: [
    //         {
    //             path: 'lablenew',
    //             element: <LableNew />
    //         },
    //         {
    //             path: 'lableupdate',
    //             element: <LableUpdate />
    //         }
    //     ]
    // },
    {
        path: 'lablenew',
        element: <LableNew />
    },
    {
        path: 'lableupdate',
        element: <LableUpdate />
    },
    {
        path: '/chart',
        element: <ChartPage />
    },
    {
        path: '/export',
        element: <ExportPage />
    },
    {
        path: '/tags',
        element: <TagsPage />
    },
    {
        path: '/remind',
        element: <RemindPage />
    }
])
