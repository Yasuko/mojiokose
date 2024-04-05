import React, { Dispatch } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    MediaDataInitialInterface, MediaDataInitialPropsInterface, initialState
} from '../../_domain/whisper/reducers/MediaDataInitial'

// import Component

// import Hook

export const MediaStatus = (): JSX.Element => {
    const dispatch = useDispatch()
    const mdi = useSelector((state: MediaDataInitialPropsInterface): MediaDataInitialInterface => {
        return state.MediaDataInitial === undefined ? initialState : state.MediaDataInitial
    });

    return (
    <div className='container-fluid'>
        <div className="row row-cols-3">
            <div className="col-3">
            </div>
            <div className="col-6">
                <br></br>
                <br></br>
                <div className="row row-col-2">
                    <div className="col-4">
                        <h2>ファイル名</h2>
                    </div>
                    <div className="col-8">
                        <h2>{ mdi.name }</h2>
                    </div>
                </div>
                <br></br>
                <div className="row row-col-2">
                    <div className="col-4">
                        <h2>再生時間</h2>
                    </div>
                    <div className="col-8">
                        <h2>{ playTimeFormat(mdi.playTime) }</h2>
                        <p>※再生時間が3分を超える場合は、次の処理で分割されます</p>
                    </div>
                </div>
                <br></br>
                <div className="row row-col-2">
                    <div className="col-4">
                        <h2>ファイルサイズ</h2>
                    </div>
                    <div className="col-8">
                        <h2>{ fileSizeFormat(mdi.fileSize) }</h2>
                    </div>
                </div>
                <br></br>
                <div className="row row-col-2">
                    <div className="col-4">
                        <h2>メディアタイプ</h2>
                    </div>
                    <div className="col-8">
                        <h2>{ mdi.mediaType }</h2>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="row">
                    <div className="col">
                        <div className="container-fluid">
                            <div className="row gx-0">
                                <div className="col">
                                    <button
                                        className='btn btn-xl btn-primary'
                                        onClick={() => {
                                            dispatch({
                                                type    : 'WhisperAction/convertAudio',
                                                target  : 'mediaList'
                                            })
                                        }}
                                    >
                                        確認・処理継続
                                    </button>
                                </div>
                                <div className="col">
                                    <button
                                        className='btn btn-xl btn-secondary'
                                        onClick={() => {
                                            dispatch({
                                                type    : 'ShowScreen/set',
                                                target  : 'dragFile'
                                            })
                                        }}
                                    >
                                        キャンセル・再読込
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2">
                <div id='ffmpeg-log'>

                </div>
            </div>
        </div>
    </div>
    )
};

export default MediaStatus

// ファイルサイズが大きい場合、単位を変換する
const fileSizeFormat = (size: number): string => {
    if (size < 1024) {
        return size + 'B'
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'KB'
    } else if (size < 1024 * 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + 'MB'
    } else {
        return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
    }
}

// 再生時間が長い場合に、単位を変換する
const playTimeFormat = (time: number): string => {
    if (time < 60) {
        return time + '秒'
    } else if (time < 60 * 60) {
        return (time / 60).toFixed(2) + '分'
    } else if (time < 60 * 60 * 24) {
        return (time / 60 / 60).toFixed(2) + '時間'
    } else {
        return (time / 60 / 60 / 24).toFixed(2) + '日'
    }
}