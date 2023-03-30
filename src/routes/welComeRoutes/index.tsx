import { RouteObject } from 'react-router-dom'
import { WelComeLayout } from '../../layouts/WelComeLayout'
import { FirstPage } from './FirstPage'
import { FourthPage } from './FourthPage'
import { SecondPage } from './SecondPage'
import { ThridPage } from './ThridPage'
export const WelComeRoutes: RouteObject = {
  path: 'welcome',
  element: <WelComeLayout />,
  children: [
    {
      index: true,
      element: <FirstPage />,
    },
    {
      path: 'firstpage',
      element: <FirstPage />,
    },
    {
      path: 'secondpage',
      element: <SecondPage />,
    },
    {
      path: 'thridpage',
      element: <ThridPage />,
    },
    {
      path: 'fourthpage',
      element: <FourthPage />,
    },
  ],
}
