import React, { Dispatch, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer

// import Component
import Recorder from './Recorder'

// import Hook
import VideoHook from '../_hook/video.hook';

export const DragFile = (): JSX.Element => {
    const dispatch = useDispatch();
    VideoHook({dispatch: 'WhisperAction/hook'})

    useEffect(() => {
        console.log('Whisper useEffect')
        dispatch({
            type    : 'TokenAction/checkToken',
        });
    }, [])

    return (
    <div className='container-fluid'>
        <div className="row row-cols-3">
            <div className="form-group col">
            </div>
            <div className="form-group col">
                <div
                    id="File1b"
                    className="drag-area center"
                    onDragOver={(e) => onDragStart(e, dispatch)}
                    onDrop={(e) => onDragEnd(e, dispatch)}
                >
                    <h3>Drag Area</h3>
                    <h6>Audio File</h6>
                    <h6>Video File</h6>
                </div>
                <div>
                    <Recorder />
                </div>
            </div>
            <div className="form-group col">
            </div>
        </div>
    </div>
    )
}

const onDragStart = (e: any, dispatch: any): void => {
    const _e = e as Event
    _e.preventDefault()
    dispatch({
        type    : 'WhisperAction/DragStart',
        event   : _e,
    })
}

const onDragEnd = (e: any, dispatch: any): void => {
    const _e = e as Event
    _e.preventDefault()
    
    dispatch({
        type    : 'WhisperAction/DragEnd',
        event   : _e,
    })
    _e.stopPropagation()
}


export default DragFile