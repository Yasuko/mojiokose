import { createSlice } from '@reduxjs/toolkit';

export type MediaDataInitialPropsInterface = {
    MediaDataInitial?: MediaDataInitialInterface;
    dispatch?: any;
}

export type MediaDataInitialInterface = {
    mediaData   : any
    name        : string
    mediaType   : 'audio' | 'video'
    extension   : string
    playTime    : number
    fileSize    : number
    recAudio    : boolean
    recVideo    : boolean
}

export const initialState: MediaDataInitialInterface = {
    mediaData   : null,
    name        : '',
    mediaType   : 'audio',
    extension   : '',
    playTime    : 0,
    fileSize    : 0,
    recAudio    : false,
    recVideo    : false,
};

const slice = createSlice({
    name: 'MediaDataInitial',
    initialState,
    reducers: {
        setMedia: (state: any, action: any) => {
            return Object.assign({}, state, {
                mediaData   : action.mediaData,
                name        : action.name,
                mediaType   : action.mediaType,
                extension   : action.extension,
                playTime    : action.playTime,
                fileSize    : action.fileSize,
            });
        },
        setMediaData: (state: any, action: any) => {
            return Object.assign({}, state, {
                mediaData: action.mediaData
            });
        },
        setName: (state: any, action: any) => {
            return Object.assign({}, state, {
                name: action.name
            });
        },
        setPlayTime: (state: any, action: any) => {
            return Object.assign({}, state, {
                playTime: action.playTime
            });
        },
        setMediaType: (state: any, action: any) => {
            return Object.assign({}, state, {
                mediaType: action.mediaType
            });
        },
        setExtension: (state: any, action: any) => {
            return Object.assign({}, state, {
                extension: action.extension
            });
        },
        setRecAudio: (state: any, action: any) => {
            return Object.assign({}, state, {
                recAudio: action.recAudio
            });
        },
        setRecVideo: (state: any, action: any) => {
            return Object.assign({}, state, {
                recVideo: action.recVideo
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
