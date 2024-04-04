import { animationReducers } from '../pages/animation/index.reducer'
import { WhisperReducer } from '../_domain/whisper/index.reducers'
import { TokenReducer } from '../_domain/token/index.reducers'

import ShowContent from '../_domain/_all/reducers/ShowContent'
import FileForm from '../_domain/_all/reducers/FileForm'

export const reducer = {
    ...animationReducers,
    ...WhisperReducer,
    ...TokenReducer,
    ShowContent,
    FileForm,
}
