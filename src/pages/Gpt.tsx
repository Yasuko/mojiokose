import React from 'react';
import { Provider } from 'react-redux';

// import rootReducer from './reducers'
import { createStore } from '../_store/configureStore'

// import components
import WhisperIndex from './Whisper/index'

interface FaceInterface {
    page: string
}

const store = createStore()

const Gpt = (p: FaceInterface): JSX.Element => {

    return (
        <Provider store={store}>
            { changer(p.page) }
        </Provider>
    )
}

const changer = (p: string): JSX.Element => {
    if (p === 'whisper') return <WhisperIndex />
    return <WhisperIndex />
}

export default Gpt
