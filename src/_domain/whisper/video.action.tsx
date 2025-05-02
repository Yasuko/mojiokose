import { put, select, takeEvery } from 'redux-saga/effects'

// import helper
import { AudioVisualHelper } from './helper/AudioVisual.helper'
import { VideoHelper } from './helper/video.helper'

// import reducer
import {
    WhisperOptionPropsInterface,
    WhisperOptionInterface,
} from './reducers/WhisperOption'

import { EncodeHelper } from './helper/encode.helper'

const WhisperOption = (state: WhisperOptionPropsInterface) => state.WhisperOption

// Root Saga登録配列
export const RootVideoAction = [
    // フック
    takeEvery('VideoAction/hook', hook),
    // 録画開始
    takeEvery('VideoAction/camera', camera),
    // 録画終了
    takeEvery('VideoAction/doneCamera', doneCamera),
    // 録画を保存
    takeEvery('VideoAction/setMove', setMove),
    // 変換試験
    takeEvery('VideoAction/encodeTest', encodeTest),
];

/**
 * Video Hook受け口
 * @param val 
 */
export function* hook(val: any): any {
    yield put({
        type        : val.task,
        data        : val.data,
    })
}

/**
 * 録画開始
 * @param val 
 * @returns any
 */
export function* camera(val: any): any {
    yield put({
        type        : 'WhisperOption/setRecVideo',
        recVideo    : true,
    })

    yield VideoHelper.call()
                .setTask('VideoAction/setMove')
                .setup()
    yield VideoHelper.call().start()
}

/**
 * 録画終了処理
 * @param val 
 */
export function* doneCamera(val: any): any {
    yield VideoHelper.call().stop()
    const cams = yield VideoHelper.call().getMoves()

    yield put({
        type        : 'WhisperOption/setRecVideo',
        recVideo    : false,
    })
}

export function* setMove(val: any): any {
    yield put({
        type        : 'WhisperOption/addRecorder',
        recorder    : {
            rec         : val.data.move,
            time        : val.data.time,
            name        : val.data.name + '.' + val.data.extension,
            text        : '',
            formation   : '',
            summary     : '',
            extension   : val.data.extension,
        }
    });
}

export function* encodeTest(val: any): any {
    const wf: WhisperOptionInterface = yield select(WhisperOption);
    yield EncodeHelper.call()
            .setup(val.file.rec, val.file.name)
            .separateAudio(val.file.extension);
    const result = yield EncodeHelper.call().getResult();
    
    yield put({
        type        : 'WhisperOption/addRecorder',
        recorder    : {
            rec         : result.data,
            time        : val.file.time,
            name        : result.name,
            text        : '',
            formation   : '',
            summary     : '',
            extension   : result.name.split('.')[1]
        }
    });
}


export function* Sound(): any
{
    yield AudioVisualHelper.call().setupSound();
    yield AudioVisualHelper.call().playSound();
}

export function*showLoading(show: boolean, message: string = ''): any
{
    yield put({
        type        : 'LoadingAction/showLoading',
        show        : true,
        message     : message
    });
} 

