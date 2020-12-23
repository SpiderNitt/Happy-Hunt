import React from 'react';
import { makeStyles } from '@material-ui/core';
 
const useStyles = makeStyles((theme) => ({
    error: {
        fontSize: 14,
        color: 'red',
    }
}))

function ErrorMessage({ visible, error }) {
    const styles = useStyles();

    if(!visible || !error) return null;

    return (
        <div className={styles.error}>
            {error}
        </div>
    );
}

export default ErrorMessage;