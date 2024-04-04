import { createSlice } from '@reduxjs/toolkit';

export interface toasterAnimationPropsInterface {
    toasterAnimation?: toasterAnimationInterface;
    dispatch?: any;
}

/**
 *
 * toasterMode: 表示データの種別 背景色が変わる
 *  success : 成功
 *  info    : 情報
 *  warn    : 警告
 *  error   : 失敗
 */
export interface toasterAnimationInterface {
    show: boolean;
    text: string;
    mode: string;
}

export const initialState = {
    show: false,
    text: '',
    mode: ''
};

const slice = createSlice({
    name: 'toasterAnimation',
    initialState,
    reducers: {
        setShow: (state: any = false, action: any) => {
            return Object.assign({}, state, {
                show: action.show,
                text: action.text,
                mode: action.mode
            });
        },
        RESET: (state: any = false, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
