import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    ShowScreenPropsInterface, ShowScreenInterface,
    initialState
} from '../../_domain/whisper/reducers/ShowScreen'

// import component
import DragFile from './DragFile'
import MediaStatus from './MediaStatus'
import MediaList from './MediaList'
import InputToken from '../token/InputToken'


export const Screen = (): JSX.Element => {
    const ss = useSelector((state: ShowScreenPropsInterface): ShowScreenInterface => {
        return state.ShowScreen === undefined ? initialState : state.ShowScreen
    })
    return (
        <div>
            { checkScreen(ss) }
        </div>
    )
}

const checkScreen = (ss: ShowScreenInterface): JSX.Element => {
    if (ss.target === 'dragFile') {
        return <DragFile />
    }
    if (ss.target === 'mediaState') {
        return <MediaStatus />
    }
    if (ss.target === 'mediaList') {
        return <MediaList />
    }

    if (ss.target === 'token') {
        return <InputToken />
    }

    return <div></div>
}

export default Screen
