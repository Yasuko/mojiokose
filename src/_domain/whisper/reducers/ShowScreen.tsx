import { createSlice } from '@reduxjs/toolkit'

export type ShowScreenPropsInterface = {
    ShowScreen?: ShowScreenInterface
    dispatch?: any
}

export type ShowScreenInterface = {
    target      : string
    next        : string
    show        : boolean
}

export const initialState: ShowScreenInterface = {
    target      : 'dragFile',
    next        : '',
    show        : false,
}

const slice = createSlice({
    name: 'ShowScreen',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return Object.assign({}, state, {
                target: action.target,
                next: action.next,
                show: (state.show) ? false : true,
            })
        },
        reset: (state: any, action: any) => {
            return initialState
        }
    }
})

export default slice.reducer
