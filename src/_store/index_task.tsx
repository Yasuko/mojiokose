import { all } from 'redux-saga/effects'

import { RootWhisperDomain } from '../_domain/whisper/index.task'
import { RootTokenDomain } from '../_domain/token/index.task'

import { AnimationTask } from '../pages/animation/index.task'

export default function* rootSaga() {
    yield all([
        ...RootWhisperDomain,
        ...RootTokenDomain,
        ...AnimationTask
    ]);
}
