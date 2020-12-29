import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


function Welcome(props) {
    const classes = useStyles();
    return (
        <div className={classes.welcome}>
            <h1>Welcome!</h1>
            <Button variant="contained" color="primary" href="/starting">
                Continue
            </Button>
        </div>
    );
}

const useStyles = makeStyles({
    welcome: {
      margin:100
    },
  });

export default Welcome;