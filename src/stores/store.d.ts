import {Partial} from '@react-spring/web'
import {FormError} from '../lib/validata'

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