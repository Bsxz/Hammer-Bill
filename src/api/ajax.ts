import type { AxiosError } from 'axios'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const requestList = new Map()
axios.defaults.baseURL = isDev
    ? '/'
    : 'https://mangosteen2.hunger-valley.com'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    return config
})
export const useAjax = () => {
    const nav = useNavigate()
    useEffect(() => {
        axios.interceptors.request.use((config) => {
            if (requestList.has(config.url)) {
                requestList.get(config.url)(config.url)
                requestList.delete(config.url)
            }
            config.cancelToken = new axios.CancelToken((cancel) => {
                if (!requestList.has(config.url))
                    requestList.set(config.url, cancel)
            })
            return config
        })
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
        patch: <T>(path: string, data: PatchTag) => {
            return axios.patch<T>(path, data)
        },
        delete: () => {
        }
    }
    return ajax
}
