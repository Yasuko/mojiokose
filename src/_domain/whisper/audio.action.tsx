import { put, select, takeEvery } from 'redux-saga/effects';

// import helper
import { AudioVisualHelper } from './helper/AudioVisual.helper';

import { loadingShow, loadingHide } from '../animation/animation'

// import reducer
import {
    WhisperOptionPropsInterface,
} from './reducers/WhisperOption';

import { duplicator, updateArray } from '../../_helper/object.helper';
import { EncodeHelper } from './helper/encode.helper';

const WhisperOption = (state: WhisperOptionPropsInterface) => state.WhisperOption

// Root Saga登録配列
export const RootAudioAction = [
    // 録音開始
    takeEvery('AudioAction/recorder', recorder),
    // 録音ファイルを削除
    takeEvery('AudioAction/delRecorder', delRecorder),
    // 録音終了
    takeEvery('AudioAction/doneRecorder', doneRecorder),
    // 録音ファイルをエンコード
    takeEvery('AudioAction/encode', encode),
    // 録音ファイルを分割
    takeEvery('AudioAction/split', split),
    // 録音ファイルをダウンロード
];

/**
 * 録音開始
 */
export function* recorder(): any
{
    console.log('Get`s')
    yield AudioVisualHelper.call().setup()
    yield AudioVisualHelper.call().start()
}

/**
 * 録音終了
 */
export function* doneRecorder(): any {
    yield AudioVisualHelper.call().stop()
    const wav = AudioVisualHelper.call().getWav()
    yield put({
        type        : 'WhisperOption/addRecorder',
        recorder    : {
            rec         : yield EncodeHelper.call().toBase64(wav.rec),
            time        : wav.time,
            name        : wav.name,
            text        : '',
            formation   : '',
            summary     : '',
            extension   : 'wav'
        }
    })

    yield put ({
        type        : 'MediaDataInitial/setMedia',
        mediaData   : wav.rec,
        name        : wav.name,
        mediaType   : 'audio',
        playTime    : wav.time,
        fileSize    : 0,
        extension   : 'wav'
    })

    yield put ({
        type        : 'ShowScreen/set',
        target      : 'mediaState',
        next        : '',
        show        : true,
    })

}

/**
 * 録音削除
 * @param val 
 */
export function* delRecorder(val: any): any
{
    const recs = yield select(WhisperOption)
    const _rec = duplicator(recs.recorder)
    delete _rec[val.key]
    yield put({
        type        : 'WhisperOption/setRecorder',
        recorder    : _rec
    })
}


/**
 * コーデック変換
 * @param val any
 * @return any
 */
export function* encode(val: any): any
{
    // ローディング表示
    yield loadingShow('Now 変換してるねん Now')
    // 録音ファイル取得
    const recorders = yield select(WhisperOption)
    // エンコード
    yield EncodeHelper.call()
            .setup(val.file.rec, val.file.name)
            .toMp3()
    const result = yield EncodeHelper.call().getResult()
    // 録音ファイル一覧の内容を更新
    const _reducers =
        updateArray(
            recorders.recorder,
            val.key,
            {
                rec         : result.data,
                time        : val.file.time,
                name        : result.name,
                text        : recorders.recorder[val.key].text,
                formation   : recorders.recorder[val.key].formation,
                summary     : recorders.recorder[val.key].summary,
                extension   : 'mp3',
            }
        );
    // 録音ファイル一覧を更新
    yield put({
        type        : 'WhisperForm/setRecorder',
        recorder    : _reducers
    })
    // ローディング非表示
    yield loadingHide()
}

/**
 * 音ファイルの分割
 * @param val 
 */
export function* split(val: any): any
{
    // ローディング表示
    yield loadingShow('Now ファイル分割中 Now')

    // 録音ファイルを分割
    const split = yield EncodeHelper.call()
                            .setup(val.file.rec, val.file.name)
                            .split(val.file.time)
    // 録音ファイル一覧を更新
    yield put({
        type        : 'WhisperForm/setRecorder',
        recorder    : split
    })
    // ローディング非表示
    yield loadingHide()
}

/**
 * 音声再生
 */
export function* Sound(): any
{
    yield AudioVisualHelper.call().setupSound()
    yield AudioVisualHelper.call().playSound()
}

