import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function GameIntro() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="secondary">
        Secondary
      </Button>
    </div>
  );
}
