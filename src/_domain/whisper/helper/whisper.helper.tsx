import {
    WhisperOptions,
    initialWhisperOptions
} from "../reducers/WhisperOption"

export const buildWhisperJob = (
    media: any[],
    options: WhisperOptions
) => {

    const _options =  {
            ...options,
            audio: media
        }

    return _options
}

export const buildDocumentJob = (
    medias: any[],
    options: WhisperOptions
) => {

    const _options = medias.map((val, key) => {
        return {
            ...options,
            audio: val.mediaData
        }
    })
    return _options
}


export const buildSummaryJob = (
    medias: any[],
    options: WhisperOptions
) => {

    const _options = medias.map((val, key) => {
        return {
            ...options,
            audio: val.mediaData
        }
    })
    return _options
}


export type WebVTTData = { time: string, text: string }
export const parseWebVTT = (
    input: string
): WebVTTData[] => {
    const lines = input.split('\n')
    const result: WebVTTData[] = []

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('-->')) {
            const time = lines[i]
            let text = ''
            while (lines[++i] && lines[i].trim() !== '') {
                text += lines[i] + '\n'
            }
            result.push({ time, text: text.trim() })
        }
    }

    return result
}