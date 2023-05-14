import { Partial } from '@react-spring/web'
import { FormError } from '../lib/validata'
import { number } from 'echarts'

interface Local {
    hasReadWelcome: boolean
    setHasReadWelcome: (read: boolean) => void
}

type Data = {
    email: string
    code: string
}

interface Login {
    data: Data
    error: FormError<Data>
    setData: (data: Partial<Data>) => void
    setError: (error: Partial<FormError<Data>>) => void
}

interface Menu {
    visible: boolean
    start: boolean
    setVisible: (visible: boolean) => void
    setStart: (start: boolean) => void
}

interface Tag {
    name: string
    kind: Tag['kind']
    sign: string
}

interface TagForm {
    data: Tag
    error: FormError<Tag>
    setData: (data: Partial<Tag>) => void
    setError: (error: Partial<FormError<Tag>>) => void
}

interface Bar {
    key: string
    sign: Tag['sign']
    value: number
    amount?: string
    bgColor?: string
}

type Line = (string | number)[]

interface Pie {
    name: string,
    value: number
}

interface ChartData {
    line?: Line[],
    pie?: Pie[],
    bar?: Bar[],
}

interface Chart {
    data: ChartData
    barColors: string[]
    setData: (v: Partial<ChartData>) => void
    setBarColors: (v: ChartData['barColors']) => void
}