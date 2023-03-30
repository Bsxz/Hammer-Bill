import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Router } from './routes'
import './global.css'
import 'virtual:svgsprites'
const root = document.getElementById('root') as HTMLElement

const app = ReactDOM.createRoot(root)

app.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
)
