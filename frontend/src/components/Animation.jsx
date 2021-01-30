import React from 'react';
import Lottie from 'react-lottie'
import ImageRoutes from '../utils/AnimationRoute';

function Animation({AnimationRoute}) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: ImageRoutes[AnimationRoute],
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

export default Animation;