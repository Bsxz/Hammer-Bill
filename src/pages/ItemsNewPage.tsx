import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {Icon} from '../components/Icon'
import {StyledGradient} from '../components/StyledGradient'
import {TimeRangePick} from '../components/TimeRangePick'
import {TopNav} from '../components/TopNav'
import {useSelectStore} from '../stores/useSelectStore'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(80vh - var(--vh-offset, 0px));
`
const StyledContent = styled.div`
  display: flex;
  height: 60%;
  padding: 12px 0 0 24px;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
  overflow: auto;
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;

  .add {
    opacity: 0;
  }

  > div {
    width: 42px;
    height: 42px;
    text-align: center;
    border-radius: 50%;
    padding-top: 5px;
    background-color: #ccc;
  }
`
const KeyBoard = styled.div`
  flex: 1;
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
  height: 33%;
  border-top: 1px solid #000;
  place-items: center;

  > div {
    font-size: 20px;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border: .5px solid #ccc;
    margin: 0px -1px -1px 0px;
  }

  .div1 {
    grid-area: box1;
    border-left: none;
  }

  .div2 {
    grid-area: box2;
  }

  .div3 {
    grid-area: box3;
  }

  .div4 {
    grid-area: box4;
  }

  .div5 {
    grid-area: box5;
    border-left: none;
  }

  .div6 {
    grid-area: box6;
  }

  .div7 {
    grid-area: box7;
  }

  .div8 {
    grid-area: box8;
    border-left: none;
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
    background-color: var(--bgcolor2);
  }

  .div12 {
    grid-area: box12;
    border-left: none;
  }

  .div13 {
    grid-area: box13;
  }

  .div14 {
    grid-area: box14;
    border: none;
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
export const ItemsNewPage: React.FC = () => {
    const {selected, onSelected} = useSelectStore()
    const nav = useNavigate()
    const back = () => {
        nav(-1)
    }
    return (
        <>
            <StyledGradient>
                <TopNav title="记一笔" icon={
                    <Icon name="back" w="36" h="36" onClick={back} />
                } />
                <TimeRangePick selected={selected} onSelected={onSelected} timeRanges={[
                    {key: 'spending', text: '支出'},
                    {key: 'income', text: '收入'}
                ]} />
            </StyledGradient>
            <Box>
                <StyledContent>
                    <Div>
                        <div>
                            <Icon name="add" w="32" h="32" />
                        </div>
                        <span className="add">123</span>
                    </Div>
                    {Array.from({length: 40}).map(v => <Div>
                        <div>
                            <Icon name="flight" w="32" h="32" />
                        </div>
                        <span>打车</span></Div>)}
                </StyledContent>
                <KeyBoard>
                    <div className="div14">
                        <Left>
                            <Icon name="flight" w="24" h="24" />
                            <span>日期</span>
                        </Left>
                        <span>119191</span>
                    </div>
                    <div className="div1">1</div>
                    <div className="div2">2</div>
                    <div className="div3">3</div>
                    <div className="div4">清空</div>
                    <div className="div5">4</div>
                    <div className="div6">5</div>
                    <div className="div7">6</div>
                    <div className="div8">7</div>
                    <div className="div9">8</div>
                    <div className="div10">9</div>
                    <div className="div11">提交</div>
                    <div className="div12">0</div>
                    <div className="div13">.</div>
                </KeyBoard>
            </Box>
        </>
    )
}
