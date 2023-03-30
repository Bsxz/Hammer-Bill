import React from 'react'
import { Link } from 'react-router-dom'
import { WelcomeDiv } from '../../components/styled/WelcomeDiv'
import clock from '../../assets/icons/clock.svg'
import { Icon } from '../../components/Icon'
export const SecondPage: React.FC = () => {
  return (
    <>
      <WelcomeDiv>
        <Icon name="clock" />
        {/* <img src={clock} alt="闹钟" /> */}
        <h2>
          每日提醒
          <br />
          不会遗漏每一笔账单
        </h2>
        <Link to="/welcome/thridpage" className="page">
          下一页
        </Link>
      </WelcomeDiv>
    </>
  )
}
