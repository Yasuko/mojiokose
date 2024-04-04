import { createSlice } from '@reduxjs/toolkit';

export type ShowTextPropsInterface = {
    ShowText?: ShowTextInterface
    dispatch?: any
}

export type ShowTextInterface = {
    key         : number
    convText    : string
    adjustText1 : string
    adjustText2 : string
    summaryText : string
    showTab     : number
}

export const initialState: ShowTextInterface = {
    key         :  0,
    convText    : '',
    adjustText1 : '',
    adjustText2 : '',
    summaryText : '',
    showTab     : 0
}

const slice = createSlice({
    name: 'ShowText',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return Object.assign({}, state, {
                key: action.key,
                convText: action.convText,
                adjustText1: action.adjustText1,
                adjustText2: action.adjustText2,
                summaryText: action.summaryText
            });
        },
        setKey: (state: any, action: any) => {
            return Object.assign({}, state, {
                key: action.key
            });
        },
        setConvText: (state: any, action: any) => {
            return Object.assign({}, state, {
                convText: action.text
            });
        },
        setAdjustText1: (state: any, action: any) => {
            return Object.assign({}, state, {
                adjustText1: action.text
            });
        },
        setAdjustText2: (state: any, action: any) => {
            return Object.assign({}, state, {
                adjustText2: action.text
            });
        },
        setSummaryText: (state: any, action: any) => {
            return Object.assign({}, state, {
                summaryText: action.text
            });
        },
        setShowTab: (state: any, action: any) => {
            return Object.assign({}, state, {
                showTab: action.showTab
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
