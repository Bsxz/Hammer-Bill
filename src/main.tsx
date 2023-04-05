import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import 'virtual:svgsprites'
import './global.css'
import {Router} from './routes'

const root = document.getElementById('root') as HTMLElement
const app = ReactDOM.createRoot(root)
app.render(
    <React.StrictMode>
        <RouterProvider router={Router} />
    </React.StrictMode>
)
