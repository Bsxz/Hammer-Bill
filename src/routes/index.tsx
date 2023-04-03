import { Outlet, createHashRouter } from 'react-router-dom'
import { Login } from '../components/Login'
import { Root } from '../components/Root'
import { Chart } from '../pages/Chart'
import { Export } from '../pages/Export'
import { Home } from '../pages/Home'
import { ItemsPage } from '../pages/ItemsPage'
import { NotFound } from '../pages/NotFound'
import { Tags } from '../pages/Tags'
import { Remind } from '../pages/welcomepage/Remind'
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
    element: <Login />
  },
  {
    path: '/itemspage',
    element: <ItemsPage />
  },
  {
    path: '/chart',
    element: <Chart />
  },
  {
    path: '/export',
    element: <Export />
  },
  {
    path: '/tags',
    element: <Tags />
  },
  {
    path: '/remind',
    element: <Remind />
  }
])
