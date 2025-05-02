import { put } from 'redux-saga/effects';

/**
 * 読み込み中アニメーション表示
 * @param message string
 * @returns any
 */
export function* loadingShow(message: string): any {
    yield put({
        type        : 'loadingAnimation/setShow',
        show        : true,
        message     : message
    })
}

/**
 * 読み込み中アニメーション非表示
 * @returns any
 */
export function* loadingHide(): any {
    yield put({
        type        : 'loadingAnimation/setShow',
        show        : false,
        message     : ''
    })
}


export function* toasterShow(
    message: string,
    type: 'error' | 'info' | 'success' | 'warning' = 'info'
): any {
    yield put({
        type        : 'toastAnimation/setShow',
        show        : true,
        message     : message
    })
}