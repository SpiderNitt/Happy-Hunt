import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function Starting(props) {
    const classes = useStyles();
    return (
        <div className={classes.starting}>
            <h1>hunt starts in..</h1>
            <Button variant="contained" color="primary" href="/rules">
                Rules and Regulations 
            </Button>
        </div>
    );
}

const useStyles = makeStyles({
    starting: {
      margin:100
    },
  });
  

export default Starting;