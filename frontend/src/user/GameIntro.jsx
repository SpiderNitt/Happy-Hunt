import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

export default function GameIntro() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Typography variant="button" display="block" gutterBottom>
            Happy Hunt Challenge
        </Typography>
        <Button variant="outlined" color="secondary">
            Instructions
        </Button>
        <br/>
        <Button variant="outlined" color="secondary" href="/clue">
            Start Game
        </Button>
    </div>
  );
}
