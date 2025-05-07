import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    MediaDataMoldedPropsInterface, MediaDataMoldedInterface,
    initialState,
} from '../../_domain/whisper/reducers/MediaDataMolded'


export const MediaList = (): React.JSX.Element => {
    const dispatch = useDispatch();

    const mdm = useSelector((state: MediaDataMoldedPropsInterface): MediaDataMoldedInterface => {
        return state.MediaDataMolded === undefined ? initialState : state.MediaDataMolded
    })

    if (mdm.mediaData.length === 0) {
        return (
            <div>not data</div>
        )
    }
    return buildList(mdm, dispatch)
}

const buildList = (mdm: MediaDataMoldedInterface, dispatch: any): React.JSX.Element => {
    const list = mdm.mediaData.map((val, key): React.JSX.Element => {
        return (
        <div
            key={key}
            className='
                w-full px-4 py-2
                border-b-2 border-gray-600
                mb-4
                '>

            <div className='flex justify-center'>
                <div
                    className='w-4/12 cursor-pointer text-gray-200 hover:text-gray-400'
                    onClick={() => {
                        dispatch({
                            type    : 'ShowContent/whisperShowText',
                        })
                        dispatch({
                            type        : 'ShowText/set',
                            convText    : val.convText,
                            summaryText : val.summaryText,
                            adjustText1 : val.adjustText1,
                            adjustText2 : val.adjustText2,
                            key         : key
                        })
                    }}>
                    {val.name}
                </div>
                <div className='w-1/12 whisper-rec-list-time text-gray-200'>
                    { Math.floor(val.playTime * 100) / 100} sec
                </div>
                <div className='w-3/12 flex space-x-1 '>
                    <button
                        className='
                            px-4 py-1 rounded 
                            text-xs text-white
                            bg-blue-500 hover:bg-blue-600
                            cursor-pointer
                            '
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/convertText',
                                payload : key
                            })
                        }}
                    >文字起</button>
                    <button
                        className='
                            px-4 py-1 rounded
                            text-xs text-white
                            bg-blue-500 hover:bg-blue-600
                            cursor-pointer
                            '
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/convertDocument',
                                key     : key
                            })
                        }}
                    >整形</button>
                    <button
                        className='
                            px-4 py-1 rounded
                            text-xs text-white
                            bg-blue-500 hover:bg-blue-600
                            cursor-pointer
                            '
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/convertSummary',
                                key     : key
                            })
                        }}
                    >要約</button>
                    <button
                        className='
                            px-4 py-1 rounded
                            text-xs text-white
                            bg-blue-500 hover:bg-blue-600
                            cursor-pointer
                        '
                        onClick={() => {
                            dispatch({
                                type     : 'WhisperAction/download',
                                payload  : key
                            })
                        }}
                        >DL</button>
                </div>
            </div>
            <div className='flex justify-start'>
                <div className='w-2/12 '></div>
                {txtCheck(val.convText) ? grayBox('text') : grayBox('text', true)}
                {txtCheck(val.adjustText1) ? grayBox('shape') : grayBox('shape', true)}
                {txtCheck(val.adjustText2) ? grayBox('Digest') : grayBox('Digest', true)}
            </div>
        </div>
        );
    })
    return (
        <div className='w-svw h-svh mx-auto px-4 bg-gray-800'>
            { list }
            <div className='flex justify-center mt-4'>
                <button
                    className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
                    onClick={() => {
                        dispatch({
                            type    : 'WhisperAction/allProcess',
                        })
                    }}
                >
                    一括（文字起・成形・要約）
                </button>
            </div>
        </div>
    )
}

const grayBox = (text: string, toggle: boolean = false) => {
    const color = toggle ? 'bg-green-200' : 'bg-gray-200'

    return (
        <div className={`${color} px-3 py-0 m-1 rounded text-center text-sm `}>{text}</div>
    )
}

const txtCheck = ( text: string | undefined ): boolean => {
    return (text === undefined || text === '') ? true : false
}

export default MediaList
