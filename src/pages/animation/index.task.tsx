import { put } from 'redux-saga/effects';

export const AnimationTask = [loading_animation, toaster_animation];

export function* loading_animation(status: boolean) {
    yield put({
        type: 'Animation/LOADING_ANIMATION',
        isLoading: status
    });
}

export function* toaster_animation(status: any) {
    yield put({
        type: 'Toaster/setShow',
        toasterLoading: status.toasterLoading,
        toasterText: status.toasterText,
        toasterMode: status.toasterMode
    });
}
