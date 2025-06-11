import React, { useEffect } from 'react'
import { useAppDispatch } from '@/_store/configureStore';

// import reducer

// import Component
import Recorder from './Recorder'

// import Hook
import VideoHook from '@/pages/_hook/video.hook';

export const DragFile = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    VideoHook({dispatch: 'WhisperAction/hook'})

    useEffect(() => {
        console.log('Whisper useEffect')
        dispatch({
            type    : 'TokenAction/checkToken',
        });
    }, [])

    return (
    <div
        className='
            w-svw h-svh mx-auto px-4
            flex flex-col items-center justify-center
            bg-gray-800
            '>

            <div className="w-full">
                <div
                    id="File1b"
                    className="
                        w-2/3 h-48 m-auto
                        border-2 border-gray-300 bg-gray-200
                        rounded-lg p-6
                        flex flex-col items-center justify-center
                        hover:bg-gray-400
                        transition duration-300 ease-in-out
                        cursor-pointer
                        "
                    onDragOver={(e) => onDragStart(e, dispatch)}
                    onDrop={(e) => onDragEnd(e, dispatch)}
                >
                    <h3 className="text-xl font-bold mb-2">Drag Area</h3>
                    <h6 className="text-sm text-gray-600 mb-1">Audio File</h6>
                    <h6 className="text-sm text-gray-600">Video File</h6>
                </div>
                {/*
                <div>
                    <Recorder />
                </div>
                */}
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