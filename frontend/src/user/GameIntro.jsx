import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '30%',
  },
}));

export default function GameIntro() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Typography variant="button" display="block" style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Happy Hunt Challenge
        </Typography>
        <Button variant="outlined" color="secondary" href="/register">
            Register
        </Button>
        <br/>
        <Button variant="outlined" color="secondary" href="/login">
            Login
        </Button>
    </div>
  );
}
