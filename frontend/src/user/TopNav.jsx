import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Routes from '../utils/routes';
import { HeadsetMicOutlined, Notifications } from '@material-ui/icons';
import { Link, Tab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },

  title: {
    flexGrow: 1,
    fontWeight: 600,
    textAlign: 'left',
    color: 'white',
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  paper: {
    backgroundColor: "#505050",
    border: 0,
   
  },
  button: {
    color:"white",
    fontFamily:"tahoma",
    fontSize: 15,
    padding:20
   
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title} component={Link} href={Routes.HOME}>
            Happy Hunt
          </Typography>
          <Button href={Routes.USER_PROFILE} color="inherit">
            <AccountCircleIcon />
          </Button>
          <Button href={Routes.USER_NOTIFICATION} color="inherit">
            <Notifications />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

