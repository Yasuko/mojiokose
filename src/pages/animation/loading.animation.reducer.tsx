import { createSlice } from '@reduxjs/toolkit';

export interface loadingAnimationPropsInterface {
    loadingAnimation?: loadingAnimationInterface;
    dispatch?: any;
}

export interface loadingAnimationInterface {
    show    : boolean;
    message : string;
}

export const initialState = {
    show    : false,
    message : 'Now Yomikonderunen....'
};

const slice = createSlice({
    name: 'loadingAnimation',
    initialState,
    reducers: {
        setShow: (state: any = false, action: any) => {
            const ms = action.message ? action.message : initialState.message;
            return Object.assign({}, state, {
                show        : action.show,
                message     : ms
            });
        }
    }
});

export default slice.reducer;

