import { createSlice } from '@reduxjs/toolkit';

export interface ShutterAnimationPropsInterface {
    ShutterAnimation?: ShutterAnimationInterface;
    dispatch?: any;
}

export interface ShutterAnimationInterface {
    show: boolean;
}

export const initialState: ShutterAnimationInterface = {
    show: false
};

const slice = createSlice({
    name: 'ShutterAnimation',
    initialState,
    reducers: {
        show: (state: any, action: any) => {
            return Object.assign({}, state, {
                show: action.show
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
