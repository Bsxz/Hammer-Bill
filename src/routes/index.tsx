import { Outlet, createHashRouter } from 'react-router-dom'
import { NotFound } from '../pages/NotFound'
import { Root } from '../components/Root'
import { WelComeRoutes } from './welComeRoutes'
import { Home } from '../pages/Home'
import { Items } from '../pages/Items'

export const Router = createHashRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      WelComeRoutes,
    ],
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/items',
    element: <Items />,
  },
])
