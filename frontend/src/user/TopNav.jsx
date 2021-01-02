import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Home } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: 70,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopNav() {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
        <Toolbar>
            <Typography variant="h5" className={classes.title}>
            Happy Hunt
            </Typography>
            <Home color="inherit" fontSize="default" />
        </Toolbar>
    </AppBar>
  );
}
