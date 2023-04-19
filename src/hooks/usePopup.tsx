import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {Popup} from '../components/Popup'

export const usePopup = () => {
    const [visible, setVisible] = useState(false)
    const root = Array.from(document.body.children).filter(v => v.id)[0]
    const popup = ReactDOM.createPortal(<Popup visible={visible} toggle={() => setVisible(!visible)}></Popup>, root)
    return {
        popup,
        toggle: () => setVisible(!visible)
    }
}
