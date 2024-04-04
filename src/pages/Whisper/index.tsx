import React from 'react-redux'
import { Provider } from 'react-redux'
import { createStore } from '../../_store/configureStore'
const store = createStore();

// import Component
import Header from '../Header'
import Screen from './Screen'
import ShowText from './ShowText'

import LoadingAnimation from '../animation/loading.animation'

export const WhisperIndex = () => {
    return (
        <Provider store={store}>
            <Header />
                <Screen />
                <LoadingAnimation />
            <ShowText />
        </Provider>
    );
};

export default WhisperIndex;
