import {Partial} from '@react-spring/web'
import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Item} from '../stores/useCreateItemStore'
import {useTags} from '../stores/useTags'
import {Icon} from './Icon'

type TabsItem = {
    data: Partial<Item>
    setData: (v: Partial<Item>) => void
}
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
export const TabsItem: React.FC<TabsItem> = ({data, setData}) => {
    const {expensesTags, incomeTags} = useTags()
    const tags = data.kind === 'expenses' ? expensesTags : incomeTags
    return (
        <Div>
            <ol>
                <li>
                    <Link to={`/tags/new?kind=${data.kind}`}><Icon name="add" w="32" h="32"
                                                                   fill={'var(--bgcolor1)'} /></Link>
                </li>
                {tags.map((v, i) =>
                    <li key={i} onClick={() => setData({tag_ids: [i]})}>
                        {v.sign}
                        <span>{v.name}</span>
                    </li>
                )}
            </ol>
        </Div>
    )
}
