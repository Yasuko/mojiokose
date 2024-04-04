import { put, select, takeEvery } from 'redux-saga/effects';

// import model
import { StrageModel } from '../_model/strage.model'

// import reducer

export const RootTokenAction = [
    takeEvery('TokenAction/checkToken', checkToken),
    takeEvery('TokenAction/setToken', setToken),
]

function* checkToken(): any
{
    const key = yield StrageModel.call().getAPI()

    if (!key) {
        yield put({
            type: 'ShowScreen/set',
            target: 'token',
            next: 'TokenAction/setToken',
            show: true,
        })
    } else {
        yield put({
            type: 'TokenForm/setToken',
            token: key,
        })
    }

    return
}

function* setToken(val: any): any
{
    console.log(val)
    yield put({
        type: 'TokenForm/setToken',
        token: val.token,
    })

    yield StrageModel.call().setAPI(val.token)

    yield put({
        type: 'ShowScreen/set',
        target: 'dragFile',
        next: '',
        show: true,
    })
}
