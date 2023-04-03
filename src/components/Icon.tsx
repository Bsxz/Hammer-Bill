import React from 'react'

interface Props {
  name?: string
  fill?: string
  w?: string
  h?: string
  x?: string
  y?: string
  onClick?: (e: React.MouseEvent) => void
}

export const Icon: React.FC<Props> = ({ name, fill, w, h, x, y, onClick }) => {
  return (
        <>
            <svg fill={fill} width={w} height={h} onClick={onClick}>
                <use xlinkHref={`#${name}`} x={x} y={y}></use>
            </svg>
        </>
  )
}
