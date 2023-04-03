import type {RefObject} from 'react'
import {useEffect, useRef, useState} from 'react'

export const useSwiper = (eltRef: RefObject<HTMLElement>) => {
    const [direction, setDirection] = useState<'' | 'left' | 'right'>('')
    const point = useRef(0)
    const onTouchStart = (e: TouchEvent) => {
        setDirection(c => (c = ''))
        point.current = e.touches[0].clientX
    }
    const onTouchMove = (e: TouchEvent) => {
        e.preventDefault()
    }
    const onTouchEnd = (e: TouchEvent) => {
        const distance = e.changedTouches[0].clientX - point.current
        if (Math.abs(distance) < 20)
            setDirection(c => c = '')
        else if (distance > 0)
            setDirection(c => c = 'right')
        else
            setDirection(c => c = 'left')
    }
    useEffect(() => {
        if (!eltRef)
            return
        eltRef.current?.addEventListener('touchstart', onTouchStart)
        eltRef.current?.addEventListener('touchmove', onTouchMove)
        eltRef.current?.addEventListener('touchend', onTouchEnd)
        return () => {
            if (!eltRef)
                return
            eltRef.current?.removeEventListener('touchstart', onTouchStart)
            eltRef.current?.removeEventListener('touchmove', onTouchMove)
            eltRef.current?.removeEventListener('touchend', onTouchEnd)
        }
    }, [])
    return {direction}
}
