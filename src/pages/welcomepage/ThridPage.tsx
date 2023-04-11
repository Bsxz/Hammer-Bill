import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { WelcomeDiv } from './WelcomeDiv'

export const ThridPage: React.FC = () => {
  return (
        <>
            <WelcomeDiv>
                <Icon name="chart" w="120" h="110" />
                <h2>
                    数据可视化
                    <br />
                    收支一目了然
                </h2>
                <Link to="/welcome/fourthpage" className="page">
                    下一页
                </Link>
            </WelcomeDiv>
        </>
  )
}
