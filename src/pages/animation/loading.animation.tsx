import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
// import 'bootstrap/dist/css/bootstrap.css';
import './loading.css';

import {
    loadingAnimationPropsInterface,
    initialState,
    loadingAnimationInterface
} from './loading.animation.reducer';

const mapStateToProps = (state: any) => {
    return state;
};

const transitionStyles: any = {
    entering: {
        transition: 'all .20s ease',
        display: 'block',
        opacity: 1
    },
    entered: {
        transition: '',
        opacity: 1
    },
    exiting: {
        transition: 'all .20s ease',
        opacity: 0
    },
    exited: {
        transition: '',
        display: 'none'
    }
};

const defaultStyle = {
    transition: 'opacity 3000ms ease-in-out',
    display: 'block',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(150, 150, 150, 0.7)',
    zIndex: 10000000,
    opacity: 1
};

const LoadingAnimation = (state: loadingAnimationPropsInterface,) =>
{
    const show = useSelector((state: loadingAnimationPropsInterface): loadingAnimationInterface => {
        return state.loadingAnimation === undefined ? initialState : state.loadingAnimation
    })

    return (
        <Transition in={show.show} timeout={550}>
            {(state) => (
                <div
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}
                    id="LoadingAnimation"
                >
                    <div className="mx-auto" style={{ width: '500px' }}>
                        <div style={{ marginTop: '50%' }}>
                            <div className="container">
                                <div
                                    className="spinner-grow text-dark loading-icon"
                                    role="status"
                                ></div>
                            </div>
                            <div className="container">
                                <h3 className="blinking loading-text">
                                    {show.message}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    );
}

export default LoadingAnimation;
