import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Container, Typography } from '@material-ui/core';
import Routes from '../utils/routes';
import {AuthContext} from '../api/authContext';
import { useHistory } from 'react-router';
import logo from '../assets/android-chrome-512x512.png';
import Footer from '../components/Footer';

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
    <>
    <Container fixed maxWidth="xl" className={classes.root}>
        <Typography component="h1" variant="h3" style={{ fontWeight: 'bold', color: '#EE5C53' }}>
          Welcome
        </Typography>
        <Typography component="h1" variant="h5" style={{ fontWeight: 'bold', color: '#213B4B' }}>
          to the
        </Typography>
        <img alt="hhc-logo" src={logo} width={300} />
        <Container fixed maxWidth="sm">
        <Button variant="outlined"  style={{ backgroundColor: '#F2F2F3', color: '#213B4B', outline: 1 , outlineColor: '#213B4B', width: '100%', marginBottom: 20 }} href={Routes.USER_REGISTER}>
            Register
        </Button>
        <br/>
        <Button variant="contained"  style={{ backgroundColor: '#213B4B', color: 'white', width: '100%' }} onClick={handleLogin}>
            Login
        </Button>
        </Container>
        <br/>
        <br/>
        <br/>
        <br/>  
    </Container>
    <Footer />
    </>
  );
}
