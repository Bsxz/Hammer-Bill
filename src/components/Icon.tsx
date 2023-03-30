import React from 'react'
interface Props {
  name?: string
  fill?: string
  w?: string
  h?: string
}
export const Icon: React.FC<Props> = (props) => {
  return (
    <>
      <svg fill={props.fill} width={props.w} height={props.h}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    </>
  )
}
