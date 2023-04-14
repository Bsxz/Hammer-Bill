import axios from 'axios'

axios.defaults.baseURL = isDev
    ? '/'
    : 'https://mangosteen2.hunger-valley.com/api/v1'
export const ajax = {
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
