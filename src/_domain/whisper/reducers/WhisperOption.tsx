import { createSlice } from '@reduxjs/toolkit';
import { addArray, duplicator } from '../../../_helper/object.helper'


export type WhisperOptionPropsInterface = {
    WhisperOption?: WhisperOptionInterface
    dispatch?: any
}

export type WhisperOptions = {
    audio: string,
    model: 'tiny' | 'small' | 'basic' | 'large',
    prompt?: string,
    output_format?: 'txt' | 'json' | 'srt' | 'vtt' | 'verbose_json',
    temperature?: number,
    language?: string,
    fp16?: 'True' | 'False',
}

export const initialWhisperOptions: WhisperOptions = {
    audio: '',
    model: 'tiny',
    prompt: '',
    output_format: 'txt',
    temperature: 0.5,
    language: 'ja',
    fp16: 'False',
}


export type RecordType = {
    rec         : string,
    time        : number,
    name        : string,
    text        : string,
    textType    : 'txt' | 'json' | 'srt' | 'vtt' | 'verbose_json',
    formation   : string,
    summary     : string,
    extension   : string,
}

export const initialRecorder: RecordType = {
    rec         : '',
    time        : 0,
    name        : '',
    text        : '',
    formation   : '',
    summary     : '',
    textType    : 'txt',
    extension   : '',
}

export type WhisperOptionInterface = {
    text        : string
    formation   : string
    summary     : string
    spell       : {[key: string]: string}
    options     : WhisperOptions
    recorder    : RecordType[]
    recAudio    : boolean
    recVideo    : boolean
}

export const initialState: WhisperOptionInterface = {
    text        :  '',
    formation   :  '',
    summary     :  '',
    spell       : {
        formation: '　\n この文書は、音声を文字起こしした内容で、誤字や脱字、言葉の意味がおかしな所があります。\n'
                    + 'また、文章の順番がおかしい場合があります。こういった箇所を修正し、読みやすい内容に整えて下さい',
        summary: '　\n この文書を、400字程度で箇条書きに整理して',
    },
    options     : initialWhisperOptions,
    recorder    : [],
    recAudio    : false,
    recVideo    : false,
};

const slice = createSlice({
    name: 'WhisperOption',
    initialState,
    reducers: {
        setText: (state: any, action: any) => {
            const re = duplicator(state.recorder)
            re[action.key].text = action.text

            return Object.assign({}, state, {
                recorder: re
            });
        },
        setFormation: (state: any, action: any) => {
            const re = duplicator(state.recorder)
            re[action.key].formation = action.formation

            return Object.assign({}, state, {
                recorder: re
            });
        },
        setSummary: (state: any, action: any) => {
            const re = duplicator(state.recorder)
            re[action.key].summary = action.summary

            return Object.assign({}, state, {
                recorder: re
            });
        },
        setRecorder: (state: any, action: any) => {
            return Object.assign({}, state, {
                recorder: action.recorder
            });
        },
        addRecorder: (state: any, action: any) => {
            const re = duplicator(state.recorder)
            return Object.assign({}, state, {
                recorder: addArray(re, action.recorder, initialState.recorder)
            });
        },
        updateOption: (state: any, action: any) => {
            const re = duplicator(state.options)
            re[action.key] = action.option
            return Object.assign({}, state.options, {
                options: re
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
})

export default slice.reducer
