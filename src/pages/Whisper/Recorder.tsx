import React from 'react'
import { useAppSelector, useAppDispatch } from '@/_store/configureStore'

// import reducer
import {
    WhisperOptionInterface,
} from '@/_domain/whisper/reducers/WhisperOption'

// import Component

// import Hook
import VideoHook from '../_hook/video.hook'

export const Recorder = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const wf = useAppSelector<WhisperOptionInterface>(state => state.WhisperOption)

    VideoHook({dispatch: 'WhisperAction/hook'})

    return (
    <div className='w-full px-4'>
        <div className="flex flex-wrap">
            <div className="w-full flex flex-row p-4">
                <button
                    id="File1b"
                    className='
                        px-2 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 mr-2'
                    disabled={wf.recVideo ? true : false}
                    onClick={() => {
                        dispatch({
                            type    : 'AudioAction/recorder'
                        })
                    }}
                >
                    Rec
                </button>
                <button
                    id="File1b"
                    className='
                        px-2 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 mr-2'
                    disabled={wf.recVideo ? true : false}
                    onClick={() => {
                        dispatch({
                            type    : 'AudioAction/doneRecorder'
                        })
                    }}
                >
                    Stop
                </button>
                <div
                    className='inline-block p-2 text-center text-gray-200 w-8 mx-2'
                    id='audio-timer'>
                    0
                </div>
                <audio id="whisper"></audio>
                <canvas
                    id="analyser_whisper"
                    className='w-46 h-6 border border-2 my-2'
                    ></canvas>
            </div>
            <div className='w-full flex mt-1 p-4'>
                <button
                    id="File1b"
                    className='
                        px-2 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 mr-2'
                    disabled={wf.recAudio ? true : false}
                    onClick={() => {
                        dispatch({
                            type    : 'VideoAction/camera'
                        })
                    }}
                >
                    Mov
                </button>
                <button
                    id="File1b"
                    className='px-2 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 mr-2'
                    disabled={wf.recAudio ? true : false}
                    onClick={() => {
                        dispatch({
                            type    : 'VideoAction/doneCamera'
                        })
                    }}
                >
                    Stop
                </button>
                <div
                    className='inline-block p-2 text-center text-gray-200'
                    id='video-timer'>
                    0
                </div>
                <video
                    id="whisper-cam"
                    className='w-12'></video>
            </div>
        </div>
    </div>
    );
};

export default Recorder