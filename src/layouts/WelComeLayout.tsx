import {animated, useTransition} from '@react-spring/web'
import type {ReactNode} from 'react'
import React, {useEffect, useRef} from 'react'
import {useLocation, useNavigate, useOutlet} from 'react-router-dom'
import styled from 'styled-components'
import {Icon} from '../components/Icon'
import {useSwiper} from '../hooks/useSwiper'
import {WelComeRoutes} from '../routes/welComeRoutes'
import {useLocalStore} from '../stores/useLocalStore'

const WelCome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
  background-color: #779649;
`
const Header = styled.header`
  text-align: center;
  margin-top: 50px;

  h2 {
    color: #fff;
  }

  span {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 1.5rem;
    color: #fff;
    cursor: pointer;
  }
`
const Main = styled.main`
  display: flex;
  height: 60vh;
  margin-top: 50px;
  justify-content: center;

  > div {
    border-radius: 10px;
    overflow: hidden;
  }
`
export const WelComeLayout: React.FC = () => {
    const {setHasReadWelcome, hasReadWelcome} = useLocalStore()
    const map = useRef<Record<string, ReactNode>>({})
    const animating = useRef(false)
    const index = useRef<number>(0)
    const animatedRef = useRef(null)
    const location = useLocation()
    const outlet = useOutlet()
    map.current[location.pathname] = outlet
    const {direction} = useSwiper(animatedRef)
    const nav = useNavigate()
    const routerChild: any = WelComeRoutes.children
        ?.map((c) => c.path)
        .filter((c) => c)
        .map((c) => '/welcome/' + c)
    const skip = () => {
        setHasReadWelcome(true)
        nav('/home')
    }
    useEffect(() => {
        if (animating.current) {
            return
        } else {
            if (direction === 'left') {
                if (routerChild.indexOf(location.pathname) + 1 === routerChild.length) {
                    nav('/home')
                    skip()
                } else {
                    nav(routerChild[index.current + 1])
                }
            } else if (direction === 'right') {
                nav(routerChild[index.current - 1])
            }
        }
    }, [direction])
    const transitions = useTransition(location.pathname, {
        form: {
            transform:
                location.pathname === '/welcome/firstpage'
                    ? 'translateX(100%)'
                    : 'translateX(0%)'
        },
        enter: {
            transform: 'translateX(0%)'
        },
        leave: {
            transform:
                routerChild.indexOf(location.pathname) > index.current
                    ? 'translateX(-100%)'
                    : 'translateX(100%)'
        },
        config: {duration: 300},
        onStart: () => {
            animating.current = true
        },
        onRest: () => {
            animating.current = false
            index.current = routerChild.indexOf(location.pathname)
        }
    })
    return (
        <>
            <WelCome>
                <Header>
                    <Icon name="logo" w="5rem" h="5rem" />
                    <h2>大锤记账</h2>
                    <span onClick={skip}>跳过</span>
                </Header>
                <Main>
                    <div ref={animatedRef}>
                        {transitions((style, pathname) => {
                            return (
                                <animated.div style={style} key={pathname}>
                                    {map.current[pathname]}
                                </animated.div>
                            )
                        })}
                    </div>
                </Main>
            </WelCome>
        </>
    )
}
