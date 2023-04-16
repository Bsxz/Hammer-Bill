import React from 'react'
import {RouterProvider} from 'react-router-dom'
import vhCheck from 'vh-check'
import 'virtual:svgsprites'
import './global.scss'
import {Router} from './routes'

vhCheck()
export const App: React.FC = () => {
    return (
        <RouterProvider router={Router} />
    )
}
