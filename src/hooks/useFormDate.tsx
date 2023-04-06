import React from 'react'

interface Rules {
    date: string
    rule: string
}

export const useFormDate = (options: Rules) => {
    const {date, rule} = options
    console.log(date)
}
