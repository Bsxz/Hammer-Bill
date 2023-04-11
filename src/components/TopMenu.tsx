import {animated, useSpring} from '@react-spring/web'
import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import useSWRInfinite from 'swr/infinite'
import {ajax} from '../api/ajax'
import {Icon} from './Icon'
import {Mask} from './Mask'

const Div = styled(animated.div)`
  position: fixed;
  top: 30px;
  left: 0;
  width: 70vw;
  height: 100vh;
  color: #fff;
  background-color: #fff;
  z-index: 256;
  touch-action: none;
`
const Header = styled.div`
  padding: 32px 0 40px 16px;
  background-color: #2a6e3f;

  h2 {
    font-size: 24px;
    margin-bottom: 12px;
  }

  a {
    color: #cbcaca;
  }
`
const Footer = styled.ul`
  padding: 16px 0 0 16px;

  a {
    display: flex;
    align-items: center;
    margin: 8px 0;
    color: #000;

    span {
      margin-left: 24px;
    }
  }
`
const getMe = () => {
    return `/api/v1/me`
}
export const TopMenu: React.FC<Props> = ({visible, setStart, onMaskVisible}) => {
    const {
        data
    } = useSWRInfinite(getMe, async path => (await ajax.get<Resource<User>>(path)).data)
    const menuStyles = useSpring({
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0%)' : 'translateX(-100%)',
        config: {duration: 1000}
    })
    return (
        <>
            <Mask top="30px" duration={1000} visible={visible} setStart={setStart} onMaskVisible={onMaskVisible} />
            <Div style={menuStyles}>
                <Header>
                    {data?.map(v => v.resource
                        ? <h2 key={v.resource.id}>{v.resource.name}</h2>
                        : <><h2>未登入用户</h2><NavLink to="/login">点击这里登入</NavLink></>)}
                </Header>
                <Footer>
                    <li><NavLink to="/statistical"><Icon w="40" h="40" name="chart" /><span>统计图表</span></NavLink>
                    </li>
                    <li><NavLink to="/export"><Icon w="40" h="40" name="export" /><span>导出数据</span></NavLink></li>
                    <li><NavLink to="/tags"><Icon w="40" h="40" name="custom" /><span>自定义分类</span></NavLink></li>
                    <li><NavLink to="/remind"><Icon w="40" h="40" name="remind" /><span>记账提醒</span></NavLink></li>
                </Footer>
            </Div>
        </>
    )
}
