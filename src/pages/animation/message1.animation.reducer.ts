import { createSlice } from '@reduxjs/toolkit';

export interface Message1AnimationPropsInterface {
    Message1Animation?: Message1AnimationInterface;
    dispatch?: any;
}

export interface Message1AnimationInterface {
    show: boolean;
    message: string;
}

export const initialState: Message1AnimationInterface = {
    show: false,
    message: ''
};

const slice = createSlice({
    name: 'Message1Animation',
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
