import React from 'react'

interface Props {
    name?: string
    fill?: string
    w?: string
    h?: string
    x?: string
    y?: string
}

export const Icon: React.FC<Props> = ({name, fill, w, h, x, y}) => {
    return (
        <>
            <svg fill={fill} width={w} height={h}>
                <use xlinkHref={'#' + name} x={x} y={y}></use>
            </svg>
        </>
    )
}
