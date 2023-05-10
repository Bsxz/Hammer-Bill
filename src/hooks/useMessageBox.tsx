import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { MessageBox } from '../components/MessageBox'

interface Props {
    handler: () => void
}
export function useMessageBox(options: Props) {
    const { handler } = options
    const [visible, setVisible] = useState(false)
    const root = Array.from(document.body.children).filter(v => v.id)[0]
    const messageBox = ReactDOM.createPortal(<MessageBox visible={visible} handler={handler}
        toggle={() => setVisible(!visible)} />, root)
    return {
        visible,
        messageBox,
        toggle: () => setVisible(!visible)
    }
}
