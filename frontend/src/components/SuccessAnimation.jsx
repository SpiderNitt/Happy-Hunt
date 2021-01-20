import React from 'react';
import Lottie from 'react-lottie'
import animationData from '../assets/animations/success_animation.json';

function SuccessAnimation(props) {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Lottie options={defaultOptions}
            height={200}
            width={200}
            style={{ marginTop: '20%' }}
        />
    );
}

export default SuccessAnimation;