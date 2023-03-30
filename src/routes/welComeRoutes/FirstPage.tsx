import React from 'react'
import { Link } from 'react-router-dom'
import piggybank from '../../assets/icons/Piggybank.svg'
import { Icon } from '../../components/Icon'
import { WelcomeDiv } from '../../components/styled/WelcomeDiv'
export const FirstPage: React.FC = () => {
  return (
    <>
      <WelcomeDiv>
        <Icon name="Piggybank" />
        <h2>
          会挣钱 <br />
          也要会省钱
        </h2>
        <Link to="/welcome/secondpage" className="page">
          下一页
        </Link>
      </WelcomeDiv>
    </>
  )
}
