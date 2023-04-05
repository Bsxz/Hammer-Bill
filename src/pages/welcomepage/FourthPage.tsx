import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Icon} from '../../components/Icon'
import {useLocalStore} from '../../stores/useLocalStore'
import {WelcomeDiv} from './WelcomeDiv'

export const FourthPage: React.FC = () => {
    const {setHasReadWelcome} = useLocalStore()
    const nav = useNavigate()
    useEffect(() => {
        return () => {
            nav('/home')
            setHasReadWelcome(true)
        }
    })
    return (
        <>
            <WelcomeDiv>
                <Icon name="cloud" w="120" h="110" />
                <h2>
                    云备份
                    <br />
                    再也不怕数据丢失
                </h2>
                <Link to="/home" className="page">
                    开启应用
                </Link>
            </WelcomeDiv>
        </>
    )
}
