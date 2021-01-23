import React from 'react';
import Lottie from 'react-lottie'
import animationData from '../assets/animations/error-404.json';

function Error_404(props) {
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
            height={300}
            width={300}
            style={{ marginTop: '20%' }}
        />
    );
}

export default Error_404;