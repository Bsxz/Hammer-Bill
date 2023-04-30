import React, { useEffect, useState } from 'react'

interface Props {
    data: number[]
    value: number
    onChange: (v: number) => void
}
export const Column: React.FC<Props> = ({ data, value, onChange }) => {
    const [isTouch, setIsTouch] = useState(false)
    const [translateY, _setTRanslateY] = useState(0)
    const [startY, setStartY] = useState(0)
    const setTranslateY = (y: number) => {
        const length = data.length
        if (y > 0 || y < -(length! - 1) * 36)
            return
        _setTRanslateY(y)
    }
    useEffect(() => {
        _setTRanslateY(-data.indexOf(value) * 36)
    }, [value])
    return (
        <>
            <div
                onTouchStart={(e) => {
                    setIsTouch(true)
                    setStartY(e.touches[0].clientY)
                }}
                onTouchMove={(e) => {
                    if (isTouch) {
                        const y = (e.touches[0].clientY - startY) + translateY
                        setTranslateY(y)
                        setStartY(e.touches[0].clientY)
                    }
                }}
                onTouchEnd={(e) => {
                    const remainder = translateY % 36
                    let y = translateY - remainder
                    if (Math.abs(remainder) > 18)
                        y += (remainder > 0 ? 1 : -1) * 36

                    setTranslateY(y)
                    onChange(data[Math.abs(y / 36)]!)
                    setIsTouch(false)
                }}>
                <ol style={{ transform: `translateY(${translateY}px)` }}>
                    {data.map(v => <li key={v}>{v}</li>)}
                </ol>
            </div>
        </>
    )
}
