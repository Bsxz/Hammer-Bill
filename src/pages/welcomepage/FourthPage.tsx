import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { WelcomeDiv } from './WelcomeDiv'
import { Icon } from '../../components/Icon'
export const FourthPage: React.FC = () => {
  const nav = useNavigate()
  return (
    <>
      <WelcomeDiv>
        <Icon name="cloud" w="129" />
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
