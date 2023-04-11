import React, {useState} from 'react'
import styled from 'styled-components'
import {usePopup} from '../hooks/usePopup'
import {time} from '../lib/time'
import {Icon} from './Icon'

const KeyBoard = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  display: grid;
  grid-template-areas:
          "box14 box14 box14 box14"
          "box1 box2 box3 box4"
          "box5 box6 box7 box4"
          "box8 box9 box10 box11"
    "box12 box12 box13 box11";
  grid-template-columns: 1fr 1fr 1fr 113px;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  place-items: center;
  background-color: #ccc;
  padding-top: 1px;
  gap: 1px;

  > div {
    font-size: 20px;
    display: flex;
    width: 100%;
    height: 56px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .div1 {
    grid-area: box1;
  }

  .div2 {
    grid-area: box2;
  }

  .div3 {
    grid-area: box3;
  }

  .div4 {
    grid-area: box4;
    height: 100%;
  }

  .div5 {
    grid-area: box5;
  }

  .div6 {
    grid-area: box6;
  }

  .div7 {
    grid-area: box7;
  }

  .div8 {
    grid-area: box8;
  }

  .div9 {
    grid-area: box9;
  }

  .div10 {
    grid-area: box10;
  }

  .div11 {
    grid-area: box11;
    color: #fff;
    height: 100%;
    background-color: var(--bgcolor2);
  }

  .div12 {
    grid-area: box12;
  }

  .div13 {
    grid-area: box13;
  }

  .div14 {
    grid-area: box14;
    justify-content: space-between;
    padding: 0 10px;

    > span {
      color: #53A867;
    }
  }
`
const Left = styled.div`
  display: flex;
  align-items: center;

  span {
    color: #999999;
    margin-left: 14px;
  }
`
export const StyledKeyBoard: React.FC = () => {
    const {popup, toggle} = usePopup()
    const [amount, setAmount] = useState('')
    const add = (str: string) => {
        if (str === '') {
            setAmount('')
            return
        }
        const _amount = amount + str
        const toFixed = _amount.split('.')
        if ((toFixed[0]?.length + toFixed[1]?.length) > 10 || toFixed[1]?.length > 2) return
        setAmount(_amount)
    }
    const submit = () => {
        console.log('我要提交了')
    }
    return (
        <>
            {popup}
            <KeyBoard>
                <div className="div14">
                    <Left onClick={toggle}>
                        <Icon name="calendar" w="24" h="24" />
                        <span>{time().format()}</span>
                    </Left>
                    <span>{Number(amount)}</span>
                </div>
                <div className="div1" onClick={() => add('1')}>1</div>
                <div className="div2" onClick={() => add('2')}>2</div>
                <div className="div3" onClick={() => add('3')}>3</div>
                <div className="div4" onClick={() => add('')}>清空</div>
                <div className="div5" onClick={() => add('4')}>4</div>
                <div className="div6" onClick={() => add('5')}>5</div>
                <div className="div7" onClick={() => add('6')}>6</div>
                <div className="div8" onClick={() => add('7')}>7</div>
                <div className="div9" onClick={() => add('8')}>8</div>
                <div className="div10" onClick={() => add('9')}>9</div>
                <div className="div11" onClick={submit}>提交</div>
                <div className="div12" onClick={() => add('0')}>0</div>
                <div className="div13" onClick={() => add('.')}>.</div>
            </KeyBoard>
        </>
    )
}
