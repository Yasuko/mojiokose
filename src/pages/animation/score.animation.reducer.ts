import { createSlice } from '@reduxjs/toolkit';

export interface ScoreAnimationPropsInterface {
    ScoreAnimation?: ScoreAnimationInterface;
    dispatch?: any;
}

export interface ScoreText {
    title: string;
    score: number | string;
}

export interface ScoreAnimationInterface {
    show: boolean;
    texts: ScoreText[] | undefined;
}

export const initialState: ScoreAnimationInterface = {
    show: false,
    texts: undefined
};

const slice = createSlice({
    name: 'ScoreAnimation',
    initialState,
    reducers: {
        show: (state: any, action: any) => {
            return Object.assign({}, state, {
                show: action.show
            });
        },
        setTexts: (state: any, action: any) => {
            return Object.assign({}, state, {
                texts: action.texts
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
