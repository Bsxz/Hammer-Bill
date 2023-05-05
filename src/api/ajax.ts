import type { AxiosError } from 'axios'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = isDev
    ? '/'
    : 'https://mangosteen2.hunger-valley.com/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    return config
})
export const useAjax = () => {
    const nav = useNavigate()
    useEffect(() => {
        axios.interceptors.response.use(undefined, (error: AxiosError) => {
            if (error.response) {
                if (error.response.status === 401)
                    nav('/login')
            }
            throw error
        })
    })
    const ajax = {
        get: <T>(path: string) => {
            return axios.get<T>(path)
        },
        post: <T>(path: string, data: JSONValue) => {
            return axios.post<T>(path, data)
        },
        patch: () => {
        },
        delete: () => {
        }
    }
    return ajax
}
