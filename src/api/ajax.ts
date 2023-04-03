import axios from 'axios'

axios.defaults.baseURL = isDev
  ? '/'
  : 'https://mangosteen2.hunger-valley.com/api/v1'
axios.defaults.withCredentials = true
export const ajax = {
  get: <T>(path: string) => {
    return axios.get<T>(path)
  },
  post: () => {
  },
  patch: () => {
  },
  delete: () => {
  }
}
