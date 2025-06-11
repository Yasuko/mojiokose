import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import createSagaMiddleware from 'redux-saga'
//import loggerMiddleware from 'redux-logger'

import { reducer } from './index.reducers'

import rootSaga from './index_task'

let store: any

export const createStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    store = configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(
            {
                serializableCheck: {
                    // 巨大なstateを持つ場合は、以下の配列に無視したいactionを追加する
                    ignoredActions: [
                        'ShowText/set',
                        'ShowContent/whisperShowText',
                        'WhisperAction/DragStart',
                        'WhisperAction/DragEnd',
                        'MediaDataMolded/setMediaData',
                        'MediaDataInitial/setMedia',
                    ],
                    ignoredActionPaths: [],
                    ignoredPaths: [
                        'MediaDataMolded.mediaData',
                        'MediaDataInitial.mediaData',
                        'mediaData',
                    ]
                }
            }
        ).concat(sagaMiddleware)
    })
    sagaMiddleware.run(rootSaga)
    return store
}

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector