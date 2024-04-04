import { createSlice } from '@reduxjs/toolkit';

export interface Message2AnimationPropsInterface {
    Message2Animation?: Message2AnimationInterface;
    dispatch?: any;
}

export interface Message2AnimationInterface {
    show: boolean;
    message: string;
}

export const initialState: Message2AnimationInterface = {
    show: false,
    message: ''
};

const slice = createSlice({
    name: 'Message2Animation',
    initialState,
    reducers: {
        show: (state: any, action: any) => {
            return Object.assign({}, state, {
                show: action.show
            });
        },
        setMessage: (state: any, action: any) => {
            return Object.assign({}, state, {
                message: action.message
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
