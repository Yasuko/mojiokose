import { RootVideoAction } from './video.action'
import { RootAudioAction } from './audio.action'
import { RootWhisperAction } from './whisper.action'

export const RootWhisperDomain = [
    ...RootVideoAction,
    ...RootAudioAction,
    ...RootWhisperAction
]
