import React from 'react'
import { useAppDispatch, useAppSelector } from '@/_store/configureStore'

// import reducer
import {
    ShowScreenInterface,
    ShowScreenPropsInterface,
} from '@/_domain/whisper/reducers/ShowScreen'

// import component
import DragFile from './DragFile'
import MediaStatus from './MediaStatus'
import MediaList from './MediaList'
import InputToken from '../token/InputToken'


export const Screen = (): React.JSX.Element => {
    const ss = useAppSelector<ShowScreenInterface>(state => state.ShowScreen)

    return (
        <>
            { checkScreen(ss) }
        </>
    )
}

const checkScreen = (ss: ShowScreenInterface): React.JSX.Element => {
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

    return <DragFile />
}

export default Screen
