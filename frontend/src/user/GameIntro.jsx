import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Routes from '../utils/routes';
import {AuthContext} from '../api/authContext';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '5%',
  },
}));

export default function GameIntro() {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const handleLogin = () => {
    if(auth.isAuthenticated()){
      auth.isAdmin() ? history.push(Routes.ADMIN_MISSIONS) : history.push(Routes.HOME);
    }else{
      history.push(Routes.USER_LOGIN);
    }
  }
  return (
    <div className={classes.root}>
        <Typography variant="button" display="block" style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Happy Hunt Challenge
        </Typography>
        <Button variant="outlined" color="secondary" href={Routes.USER_REGISTER}>
            Register
        </Button>
        <br/>
        <Button variant="outlined" color="secondary" onClick={handleLogin}>
            Login
        </Button>
    </div>
  );
}
