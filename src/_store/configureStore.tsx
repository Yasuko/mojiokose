import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './index.reducers';
import createSagaMiddleware from 'redux-saga';
//import loggerMiddleware from 'redux-logger';
import rootSaga from './index_task';

export const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer,
        // middleware: [sagaMiddleware, loggerMiddleware]
        middleware: [sagaMiddleware]
    });
    sagaMiddleware.run(rootSaga);
    return store;
};
