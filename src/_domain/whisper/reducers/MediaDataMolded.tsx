import { createSlice } from '@reduxjs/toolkit'
import { duplicator } from '../../../_helper/object.helper'


export type MediaDataMoldedPropsInterface = {
    MediaDataMolded?: MediaDataMoldedInterface
    dispatch?: any
}

export type MediaTypes = {
    name            : string
    mediaData       : any
    playTime        : number
    extension       : string
    convText        : string
    summaryText     : string
    adjustText1     : string
    adjustText2     : string
    transcription   : boolean
}

export type MediaDataMoldedInterface = {
    mediaData   : MediaTypes[]
}

export const initialState: MediaDataMoldedInterface = {
    mediaData   : [{
        name            : '',
        mediaData       : null,
        playTime        : 0,
        extension       : '',
        convText        : '',
        summaryText     : '',
        adjustText1     : '',
        adjustText2     : '',
        transcription   : false
    }],
};

const slice = createSlice({
    name: 'MediaDataMolded',
    initialState,
    reducers: {
        setMediaData: (state: any, action: any) => {
            return Object.assign({}, state, {
                mediaData: action.mediaData
            });
        },
        setTransitionText: (state: any, action: any) => {
            state.mediaData[action.key].convText = action.convText;
        },
        setAdjustText: (state: any, action: any) => {
            state.mediaData[action.key].adjustText1 = action.adjustText1;
        },
        setSummaryText: (state: any, action: any) => {
            state.mediaData[action.key].summaryText = action.summaryText;
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
