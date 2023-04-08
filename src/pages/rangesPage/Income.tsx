import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Icon} from '../../components/Icon'

const Div = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  text-align: center;
  padding: 12px 20px 0;
  overflow: scroll;

  ol {
    display: grid;
    grid-template-columns: repeat(auto-fill, 48px);
    row-gap: 36px;
    column-gap: 32px;
    justify-content: center;

    li {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      margin-top: 8px;
      border-radius: 50%;
      background-color: #EFEFEF;
      border: 1px solid var(--bgcolor1);

      span {
        position: absolute;
        bottom: -30px;
        color: #666;
      }
    }
  }

  .add {
    opacity: 0;
  }
`
export const Income: React.FC = () => {
    return (
        <>
            <Div>
                <ol>
                    <li>
                        <Link to="/itemspage/lablenew"><Icon name="add" w="32" h="32"
                                                             fill={'var(--bgcolor1)'} /></Link>
                    </li>
                    {Array.from({length: 40}).map((v, i) =>
                        <li key={i}>
                            <Icon name="flight" w="32" h="32" />
                            <span>打车2</span>
                        </li>
                    )}
                </ol>
            </Div>
        </>
    )
}
