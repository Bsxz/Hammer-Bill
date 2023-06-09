import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/Header'
import { useSwiper } from '../hooks/useSwiper'
import { WelComeRoutes } from '../routes/welComeRoutes'
import { useLocalStore } from '../stores/useLocalStore'

const WelCome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: calc(100vh - var(--vh-offset, 0px));
  background-color: #779649;
`
const FloatBtn = styled.span`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
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
    const { setHasReadWelcome } = useLocalStore()
    const map = useRef<Record<string, ReactNode>>({})
    const animating = useRef(false)
    const index = useRef<number>(0)
    const animatedRef = useRef(null)
    const location = useLocation()
    const outlet = useOutlet()
    map.current[location.pathname] = outlet
    const { direction } = useSwiper(animatedRef)
    const nav = useNavigate()
    const routerChild: any = WelComeRoutes.children
        ?.map(c => c.path)
        .filter(c => c)
        .map(c => `/welcome/${c}`)
    const skip = () => {
        setHasReadWelcome(true)
        nav('/home')
    }
    useEffect(() => {
        if (!animating.current) {
            if (direction === 'left') {
                if (routerChild.indexOf(location.pathname) + 1 === routerChild.length) {
                    nav('/home')
                    skip()
                }
                else {
                    nav(routerChild[index.current + 1])
                }
            }
            else if (direction === 'right') {
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
        config: { duration: 300 },
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
                <Header />
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
                {routerChild.indexOf(location.pathname) === routerChild.length - 1
                    ? null
                    : <FloatBtn onClick={skip}>跳过</FloatBtn>}
            </WelCome>
        </>
    )
}
