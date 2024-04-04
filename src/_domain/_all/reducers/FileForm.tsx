import { createSlice } from '@reduxjs/toolkit';


export interface FileFormPropsInterface {
    FileForm?: FileFormInterface;
    dispatch?: any;
}

export interface FileFormInterface {
    File1: string;
    File2: string;
    File3: string;
    File4: string;
    File5: string;
}

export const initialState: FileFormInterface = {
    File1:  '',
    File2:  '',
    File3:  '',
    File4:  '',
    File5:  '',
};

const slice = createSlice({
    name: 'FileForm',
    initialState,
    reducers: {
        setFile1: (state: any, action: any) => {
            return Object.assign({}, state, {
                File1: action.File1
            });
        },
        setFile2: (state: any, action: any) => {
            return Object.assign({}, state, {
                File2: action.File2
            });
        },
        setFile3: (state: any, action: any) => {
            return Object.assign({}, state, {
                File3: action.File3
            });
        },
        setButton4: (state: any, action: any) => {
            return Object.assign({}, state, {
                File4: action.File4
            });
        },
        setButton5: (state: any, action: any) => {
            return Object.assign({}, state, {
                File5: action.File5
            });
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
