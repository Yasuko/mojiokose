import { createSlice } from '@reduxjs/toolkit';

export type TokenFormPropsInterface = {
    TokenForm?: TokenFormInterface
    dispatch?: any
}

export type TokenFormInterface = {
    token: string
    initial: boolean
}

export const initialState: TokenFormInterface = {
    token: '',
    initial: false
}

const slice = createSlice({
    name: 'TokenForm',
    initialState,
    reducers: {
        setToken: (state: any, action: any) => {
            return Object.assign({}, state, {
                token: action.token,
                initial: true
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
})

export default slice.reducer
