import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import reducer
import {
    MediaDataMoldedPropsInterface, MediaDataMoldedInterface,
    initialState,
    MediaTypes
} from '../../_domain/whisper/reducers/MediaDataMolded'


export const MediaList = (): JSX.Element => {
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

const buildList = (mdm: MediaDataMoldedInterface, dispatch: any): JSX.Element => {
    const list = mdm.mediaData.map((val, key): JSX.Element => {
        return (
        <div
            key={key}
            className='container-fluid whisper-rec-list'>

            <div className='row justify-content-around'>
                <div className='col-1'></div>
                <div
                    className='col-4 whisper-rec-list-name'
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
                <div className='col-2 whisper-rec-list-time'>
                        { Math.floor(val.playTime * 100) / 100} sec
                </div>
                <div className='col-2 whisper-rec-control whisper-rec-list-button'>
                    <div
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/convertText',
                                key     : key
                            })
                        }}
                    >文字起</div>
                    <div
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/convertDocument',
                                key     : key
                            })
                        }}
                    >整形</div>
                    <div
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                            dispatch({
                                type    : 'WhisperAction/convertSummary',
                                key     : key
                            })
                        }}
                    >要約</div>
                    <div
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                            dispatch({
                                type    : 'AudioAction/download',
                                file    : val,
                                key     : key
                            })
                        }}
                        >DL</div>
                </div>
            </div>
            <div className='row justify-content-start'>
                <div className='col-2'></div>
                <div className='col-6'>
                    {txtCheck(val.convText) ? grayBox('txt') : grayBox('txt', true)}
                    {txtCheck(val.adjustText1) ? grayBox('adj1') : grayBox('adj1', true)}
                    {txtCheck(val.adjustText2) ? grayBox('adj2') : grayBox('adj2', true)}
                    {txtCheck(val.summaryText) ? grayBox('sum') : grayBox('sum', true)}

                </div>
                <div className='col-2'></div>
            </div>
        </div>
        );
    })
    return (
        <div className='whisper-rec-box'>
            { list }
            <div className='whisper-convert-button'>
                <button
                    className='btn btn-xl btn-primary'
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
    const color = toggle ? 'green' : 'gray'

    return (
        <div className={'whisper-rec-' + color +'-box whisper-rec-result-box'}>{text}</div>
    )
}

const jobChack = (md: MediaTypes, job: number): boolean => {
    let _job = 0
    _job = (md.convText === undefined || md.convText === '') ? _job - 1 : _job
    if (job === 1) return (_job + job) === 1 ? true : false

    _job = (md.adjustText1 === undefined || md.adjustText1 === '') ? _job - 1 : _job
    if (job === 2) return (_job + job) === 2 ? true : false

    _job = (md.adjustText2 === undefined || md.adjustText2 === '') ? _job - 1 : _job
    if (job === 3) return (_job + job) === 3 ? true : false

    _job = (md.summaryText === undefined || md.summaryText === '') ? _job - 1 : _job
    if (job === 4) return (_job + job) === 4 ? true : false
    return (_job + job) === -1 ? true : false
}

const txtCheck = ( text: string | undefined ): boolean => {
    return (text === undefined || text === '') ? true : false
}

export default MediaList
