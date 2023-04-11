import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { WelcomeDiv } from './WelcomeDiv'

export const FirstPage: React.FC = () => {
  return (
        <>
            <WelcomeDiv>
                <Icon name="Piggybank" w="120" h="110" />
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
