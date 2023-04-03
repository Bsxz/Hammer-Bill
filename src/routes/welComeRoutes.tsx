import type { RouteObject } from 'react-router-dom'
import { WelComeLayout } from '../layouts/WelComeLayout'
import { FirstPage } from '../pages/welcomepage/FirstPage'
import { FourthPage } from '../pages/welcomepage/FourthPage'
import { SecondPage } from '../pages/welcomepage/SecondPage'
import { ThridPage } from '../pages/welcomepage/ThridPage'
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
