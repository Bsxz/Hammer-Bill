import {AxiosError} from 'axios'
import React from 'react'
import {Navigate, NavLink, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import useSWR from 'swr'
import {useAjax} from '../api/ajax'
import {AddFloutButton} from '../components/AddFloutButton'
import {Icon} from '../components/Icon'
import {Loading} from '../components/Loading'

const Div = styled.div`
  display: flex;
  height: 85vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;

  button {
    flex-shrink: 1;
    width: 92vw;
    height: 48px;
    text-align: center;
    margin: 80px 0 20vh;
    font-size: 16px;
    line-height: 48px;
    border-radius: 8px;
    color: #fff;
    border: none;
    background-color: #779649;
  }
`
export const Home: React.FC = () => {
    const nav = useNavigate()
    const {get} = useAjax()
    const onError = (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            nav('/login')
        }
    }
    const {data: meData, error: meError} = useSWR(
        'https://mangosteen2.hunger-valley.com/api/v1/me',
        async path => await get<Resource<User>>(path).catch(onError))
    const {data: itemData, error: itemError} = useSWR(
        '/api/v1/item',
        async path => await get<Resources<Item<Tags>, Pager>>(path).catch(onError))
    const isLodingMe = !meData && !meError
    const isLodingItem = isLodingMe && !itemData && !itemError
    if (isLodingMe && isLodingItem) {
        return <Loading />
    }
    if (itemData?.data.resources[0])
        return <Navigate to="/itemspage" />
    return (
        <>
            <Div>
                <Icon name="Piggybank" fill="currentColor" w="128" h="130" />
                <NavLink to="/itemspage">
                    <button>开始记账</button>
                </NavLink>
                <AddFloutButton />
            </Div>
        </>
    )
}
