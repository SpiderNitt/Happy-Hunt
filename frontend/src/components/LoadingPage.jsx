import { makeStyles } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie'
import animationData from '../assets/animations/loader.json';

const useStyles = makeStyles(() => ({
    animation: {
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

function LoadingPage(props) {
    const styles = useStyles();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className={styles.animation}>
            <Lottie options={defaultOptions}
                height={200}
                width={200}
            />
        </div>
    );
}

export default LoadingPage;