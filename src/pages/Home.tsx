import React from 'react'
import {Navigate, NavLink} from 'react-router-dom'
import styled from 'styled-components'
import useSWR from 'swr'
import {ajax} from '../api/ajax'
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
    const {data: meData, error: meError} = useSWR(
        '/api/v1/me',
        async (path) => (await ajax.get<Resource<User>>(path)).data.resource
    )
    const {data: itemData, error: itemError} = useSWR(
        '/api/v1/item',
        async (path) => (await ajax.get<Resources<Item, Pager>>(path)).data
    )
    const isLodingMe = !meData && !meError
    const isLodingItem = isLodingMe && !itemData && !itemError
    if (isLodingMe && isLodingItem) {
        return <Loading />
    }
    if (itemData?.resources[0]) {
        return <Navigate to="/items" />
    }
    // @ts-ignore
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
