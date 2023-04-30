import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import useSWR from 'swr'
import { useAjax } from '../api/ajax'
import { AddFloutButton } from '../components/AddFloutButton'
import { Icon } from '../components/Icon'
import { Loading } from '../components/Loading'

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
    const { get } = useAjax()
    const { data, isLoading } = useSWR('/api/v1/item',
        async (path: string) => await get<Resources<Item>>(path))
    const isLodingItem = isLoading && !data
    if (isLoading && isLodingItem)
        return <Loading />

    if (data?.data.resources[0])
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
