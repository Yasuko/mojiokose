import React, { Dispatch } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    WhisperOptionPropsInterface,
    WhisperOptionInterface,
    initialState
} from '../../_domain/whisper/reducers/WhisperOption'

// import Component

// import Hook
import VideoHook from '../_hook/video.hook'

export const Recorder = (): JSX.Element => {
    const dispatch = useDispatch();
    VideoHook({dispatch: 'WhisperAction/hook'})
    const wf = useSelector((state: WhisperOptionPropsInterface): WhisperOptionInterface => {
        return state.WhisperOption === undefined ? initialState : state.WhisperOption
    });
    return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-12">
                <button
                    id="File1b"
                    className='btn btn-sm btn-primary whisper-record-button'
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
                    className='btn btn-sm btn-secondary whisper-record-button'
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
                    className='whisper-record-time container'
                    id='audio-timer'>
                    0
                </div>
                <audio id="whisper"></audio>
                <canvas
                    id="analyser_whisper"
                    className='whisper-visualise'></canvas>
            </div>
            <div className='col-12'>
                <button
                    id="File1b"
                    className='btn btn-sm btn-primary whisper-record-button'
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
                    className='btn btn-sm btn-secondary whisper-record-button'
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
                    className='whisper-record-time'
                    id='video-timer'>
                    0
                </div>
                <video
                    id="whisper-cam"
                    style={{width: '50px'}}></video>
            </div>
        </div>
    </div>
    );
};


export default Recorder;