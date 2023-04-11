import { Outlet, createHashRouter } from 'react-router-dom'
import { Root } from '../components/Root'
import { ExportPage } from '../pages/ExportPage'
import { Home } from '../pages/Home'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { ItemsPage } from '../pages/ItemsPage'
import { LoginPage } from '../pages/LoginPage'
import { NotFound } from '../pages/NotFound'
import { RemindPage } from '../pages/RemindPage'
import { StatisticalPage } from '../pages/StatisticalPage'
import { TagsEditPage } from '../pages/TagsEditPage'
import { TagsNewPage } from '../pages/TagsNewPage'
import { TagsPage } from '../pages/TagsPage'
import { WelComeRoutes } from './welComeRoutes'

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
      }
    ]
  },
  {
    path: '/tags/new',
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
    path: '/statistical',
    element: <StatisticalPage />
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
