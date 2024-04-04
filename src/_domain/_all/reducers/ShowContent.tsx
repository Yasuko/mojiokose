import { createSlice } from '@reduxjs/toolkit'

export type ShowContentPropsInterface = {
    ShowContent?: ShowContentInterface
    dispatch?: any
}

export type ShowContentInterface = {
    WhisperShowText    : boolean
}

export const initialState: ShowContentInterface = {
    WhisperShowText    :  false,
};

const slice = createSlice({
    name: 'ShowContent',
    initialState,
    reducers: {
        whisperShowText: (state: any, action: any) => {
            return Object.assign({}, state, {
                WhisperShowText : state.WhisperShowText ? false : true
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
