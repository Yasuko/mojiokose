import { put, select, takeEvery } from 'redux-saga/effects'

// import helper
import { FileHelper } from './helper/file.helper'
import { EncodeHelper } from './helper/encode.helper';
import { loadingShow, loadingHide } from '../animation/animation'

// import model
import { WhisperModel } from '../_model/whisper.model'
import { ChatModel, ChatReturn } from '../_model/chat.model'

// import reducer
import {
    MediaDataInitialPropsInterface,
} from './reducers/MediaDataInitial'
import {
    MediaDataMoldedInterface,
    MediaDataMoldedPropsInterface,
} from './reducers/MediaDataMolded'
import {
    TokenFormPropsInterface,
    TokenFormInterface,
} from '../token/reducers/TokenForm'

import { initialOCR } from './reducers/__type.ocr'


import { PayloadAction } from '@reduxjs/toolkit'

const Token = (state: TokenFormPropsInterface) => state.TokenForm
const MediaInitial = (state: MediaDataInitialPropsInterface) => state.MediaDataInitial
const MediaMolded = (state: MediaDataMoldedPropsInterface) => state.MediaDataMolded

// Root Saga登録配列
export const RootWhisperAction = [
    // Drag開始処理
    takeEvery('WhisperAction/DragStart', dragStart),
    // Drag終了処理
    takeEvery('WhisperAction/DragEnd', dragEnd),

    // mp3以外をMP3に変換
    takeEvery('WhisperAction/convertAudio', convertAudio),

    // whisperAPIに送信
    takeEvery('WhisperAction/convertText', convertText),

    // 文書整形
    takeEvery('WhisperAction/convertDocument', convertDocument),

    // 文書要約
    takeEvery('WhisperAction/convertSummary', convertSummary),

    takeEvery('WhisperAction/allProcess', allProcess),

    // 録音ファイルダウンロード
    takeEvery('WhisperAction/download', download),

]

export function* dragStart(val: any): any {}

function* dragEnd(val: any): any {
    yield FileHelper.call().dragEnd(val.event, 'file')
    const f = FileHelper.call().getDataFile()
    
    // 解析中表示
    yield loadingShow('Now 解析中 Now')

    // メディア情報を取得
    const info = yield FileHelper.call().getMediaInfo(f)

    // ドラッグされたファイルを録音ファイル一覧に保存
    yield put({
        type        : 'MediaDataInitial/setMedia',
        mediaData   : f.data,
        name        : f.name,
        mediaType   : info.mediaType,
        extension   : f.name.split('.')[1],
        playTime    : info.duration,
        fileSize    : f.size,
    })
    
    yield put({
        type        : 'ShowScreen/set',
        target      : 'mediaState',
        next        : '',
        show        : true,
    })

    yield loadingHide()
}

/**
 * mp3への変換・分割
 * @param val 
 */
function* convertAudio(val: any): any {
    const media = yield select(MediaInitial)
    // 解析中表示
    yield loadingShow('Now 分割処理中 Now')
    
    EncodeHelper.call().setup(media.mediaData, media.name)
    const medias = yield EncodeHelper.call().split(media.playTime, 'file')

    yield put({
        type        : 'MediaDataMolded/setMediaData',
        mediaData   : medias,
    })

    yield put({
        type        : 'ShowScreen/set',
        target      : 'mediaList',
        next        : '',
        show        : true,
    })
    yield loadingHide()

}

/**
 * 文字起こし
 * @param val 
 */
function* convertText(val: PayloadAction<number>): any {
    yield loadingShow('Now 文字起こし開始 Now')

    const mm: MediaDataMoldedInterface = yield select(MediaMolded)
    console.log(mm)
    const k: TokenFormInterface = yield select(Token)

    const r = yield WhisperModel.call(k.token).callWhisper(mm.mediaData[val.payload].mediaData)
    console.log(r)
    console.log(val)

    yield put({
        type    : 'MediaDataMolded/setTransitionText',
        convText: r,
        key     : val.payload,
    })
    const mm2: MediaDataMoldedInterface = yield select(MediaMolded)
    console.log(mm2)
    //yield updateShowText(val.key)
    yield loadingHide()
}

/**
 * ドキュメント整形
 * @param val 
 */
function* convertDocument(val: any): any {
    yield loadingShow('Now 文書整形開始 Now')

    const mm: MediaDataMoldedInterface = yield select(MediaMolded)
    const k: TokenFormInterface = yield select(Token)

    // ChatAPIのコール要求をサーバーに送信
    const r: ChatReturn = yield ChatModel.call(k.token)
            .callDocumetSummary(
                mm.mediaData[val.key].convText,
                {
                    ...initialOCR.options,
                }
            )
        
    yield put({
        type        : 'MediaDataMolded/setAdjustText',
        adjustText1 : r.choices[0].message.content,
        key         : val.key,
    })

    //yield updateShowText(val.key)
    yield loadingHide()

    if (val.option === true) {
        yield put({
            type    : 'WhisperAction/convertSummary',
            key     : val.key,
            option  : val.option,
        })
    }
}

function* convertSummary(val: any): any {
    yield loadingShow('Now 文書要約開始 Now')

    const mm: MediaDataMoldedInterface = yield select(MediaMolded)
    const k: TokenFormInterface = yield select(Token)

    // ChatAPIのコール要求をサーバーに送信
    const r: ChatReturn = yield ChatModel.call(k.token)
            .callDocumetSummary(
                mm.mediaData[val.key].adjustText1,
                {
                    ...initialOCR.options,
                }
            )
        
    yield put({
        type        : 'MediaDataMolded/setSummaryText',
        summaryText : r.choices[0].message.content,
        key         : val.key,
    })

    //yield updateShowText(val.key)
    yield loadingHide()

    if (val.option === true) {
        yield put({
            type    : 'WhisperAction/allProcess',
            key     : val.key,
        })
    }
}

function* allProcess(val: any): any {
    const mm: MediaDataMoldedInterface = yield select(MediaMolded)

    const _counter = (val.key === undefined) ? 0 : val.key + 1
    console.log(_counter)
    if (_counter >= mm.mediaData.length) return

    yield put({
        type        : 'WhisperAction/convertText',
        key         : _counter,
        option      : true,
    })
    
}

function* download(val: PayloadAction<number>): any {
    const mm: MediaDataMoldedInterface = yield select(MediaMolded)
    yield EncodeHelper.call().download(
        mm.mediaData[val.payload].mediaData,
        mm.mediaData[val.payload].name,
        mm.mediaData[val.payload].extension
    )
}
