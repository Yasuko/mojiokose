// import Component
import Header from '../Header'
import Screen from './Screen'
import ShowText from './ShowText'

import LoadingAnimation from '../animation/loading.animation'

export const WhisperIndex = () => {
    return (
        <>
            <Header />
                <Screen />
                <LoadingAnimation />
            <ShowText />
        </>
    );
};

export default WhisperIndex;
