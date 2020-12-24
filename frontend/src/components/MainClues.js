import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SecondNavbar from './secondNav';

function MainClues(props) {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <SecondNavbar/>
            <h2>main clues</h2>
            
        </div>
    );
}

const useStyles = makeStyles({
    main: {
      margin:200
    },
  });

export default MainClues;