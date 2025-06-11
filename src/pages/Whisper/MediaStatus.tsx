import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import reducer
import {
    MediaDataInitialInterface, MediaDataInitialPropsInterface, initialState
} from '../../_domain/whisper/reducers/MediaDataInitial'

// import Component

// import Hook

export const MediaStatus = (): React.JSX.Element => {
    const dispatch = useDispatch()
    const mdi = useSelector((state: MediaDataInitialPropsInterface): MediaDataInitialInterface => {
        return state.MediaDataInitial === undefined ? initialState : state.MediaDataInitial
    });

    return (
    <div className='w-svw h-svh mx-auto px-4 bg-gray-800'>
        <div className="flex flex-wrap">
            <div className="w-1/4">
            </div>
            <div className="w-2/4">
                <div className="my-8"></div>
                <div className="flex mb-6">
                    <div className="w-1/3">
                        <h2 className="text-2xl font-bold text-gray-200">ファイル名</h2>
                    </div>
                    <div className="w-2/3">
                        <h2 className="text-2xl font-bold text-gray-200">{ mdi.name }</h2>
                    </div>
                </div>
                <div className="flex mb-6">
                    <div className="w-1/3">
                        <h2 className="text-2xl font-bold text-gray-200">再生時間</h2>
                    </div>
                    <div className="w-2/3">
                        <h2 className="text-2xl font-bold text-gray-200">{ playTimeFormat(mdi.playTime) }</h2>
                        <p className="text-sm text-gray-400">※再生時間が10分を超える場合は、次の処理で分割されます</p>
                    </div>
                </div>
                <div className="flex mb-6">
                    <div className="w-1/3">
                        <h2 className="text-2xl font-bold text-gray-200">ファイルサイズ</h2>
                    </div>
                    <div className="w-2/3">
                        <h2 className="text-2xl font-bold text-gray-200">{ fileSizeFormat(mdi.fileSize) }</h2>
                    </div>
                </div>
                <div className="flex mb-6">
                    <div className="w-1/3">
                        <h2 className="text-2xl font-bold text-gray-200">メディアタイプ</h2>
                    </div>
                    <div className="w-2/3">
                        <h2 className="text-2xl font-bold text-gray-200">{ mdi.mediaType }</h2>
                    </div>
                </div>
                <div className="my-8"></div>
                <div className="w-full">
                    <div className="container mx-auto px-4">
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <button
                                    className='
                                        w-full h-14 py-2 px-4 bg-blue-800
                                        text-white font-semibold rounded-lg shadow-md
                                        hover:bg-blue-900
                                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
                                        cursor-pointer
                                        '
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
                            <div className="w-1/2">
                                <button
                                    className='
                                        w-full h-14 py-2 px-4 bg-gray-500
                                        text-white font-semibold rounded-lg shadow-md
                                        hover:bg-gray-600
                                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75
                                        cursor-pointer
                                        '
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
            <div className="w-1/4">
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