import {createHashRouter, Outlet} from 'react-router-dom'
import {Root} from '../components/Root'
import {ChartPage} from '../pages/ChartPage'
import {ExportPage} from '../pages/ExportPage'
import {Home} from '../pages/Home'
import {ItemsNewPage} from '../pages/ItemsNewPage'
import {ItemsPage} from '../pages/ItemsPage'
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
        element: <ItemsPage />
    },
    {
        path: '/itemspage/new',
        element: <ItemsNewPage />
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
