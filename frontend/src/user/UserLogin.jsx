import React, { useContext, useState } from 'react';
import { ArrowForward } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { Grid, TextField, Container, makeStyles, CssBaseline, Button, Typography, Avatar, Link } from '@material-ui/core';

import ErrorMessage from '../components/ErrorMessage';
import { forgotPassword, userLogin } from '../api/auth';
import Routes from '../utils/routes';
import { useHistory } from 'react-router';
import { AuthContext } from '../api/authContext';
import jwtDecode from 'jwt-decode';
import LoadingPage from '../components/LoadingPage';
import SuccessAnimation from '../components/SuccessAnimation';
import Message from '../components/Message';
import Footer from '../components/Footer';
import logo from '../assets/android-chrome-512x512.png';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
      margin: 20,
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    form: {
      justifyContent: 'center',
      width: '100%',
    },
    submit: {
      margin: theme.spacing(1, 0, 1),
    },
    TextField: {
      width: '100%',
      marginTop: 10,
      backgroundColor: '#fafafa',
    },
    input:{
      borderRadius:'15px',
      borderColor:'black'
    }
}));

export default function UserLogin(props) {
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setmessageType] = useState('');
  const [successLogin, setSuccessLogin] = useState(false);
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const History = useHistory();
  const handleSubmit = async({ email, password },{ resetForm }) => {
    setLoading(true);
    const body = {
      emailId:email.trim(),
      password:password
    }
    const response = await userLogin(body);
    if(!response.ok){
      setLoading(false);
      console.log(response.problem);
      console.log(response.data);
      setInfo(response.data.message);
      setmessageType("error");
      return;
    }
    setLoading(false);
    setSuccessLogin(true);
    const {exp} = await jwtDecode(response.data.token)
    const data = {
      token: response.data.token,
      expiresAt: exp,
      userInfo: response.data.user
    }
    await authContext.setAuthState(data);
    resetForm();
    const adminRoles = ["Admin", "SuperAdmin"];
    setTimeout(() => {
      adminRoles.includes(data.userInfo.Role) ? History.push(Routes.ADMIN_MISSIONS) : History.push(Routes.HOME);
    }, 2000);
  }

  const handleForgotPassword = async(emailId) => {
    const body = {
      emailId:emailId.trim(),
    }
    const response = await forgotPassword(body);
    if(!response.ok){
      // setLoading(false);
      console.log(response.problem);
      console.log(response.data);
      setInfo(response.data.message);
      setmessageType("error");
      return;
    }
    setInfo(response.data.message);
    setmessageType("success");
    return;
  }

  return (
    <>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    {loading && <LoadingPage /> }
    {successLogin && <SuccessAnimation />}
    {info && <Message message={info} show={true} type={messageType} />}
    {(!loading && !successLogin) && <div className={classes.paper}>
        <img alt="hhc-logo" src={logo} width={200} />
        <Typography component="h1" variant="h4" style={{ fontWeight: 'bold', textDecorationLine: 'underline', color: '#EE5C53' }}>
          Login
        </Typography>
        <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
        {({ setFieldValue, errors, touched, values }) => (
          <Form className={classes.form}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField 
                  type="text" 
                  name="email" 
                  label="Email Address" 
                  variant="outlined" 
                  value={values.email}
                  onChange={e => setFieldValue("email", e.target.value)}
                  className={classes.TextField}
                  InputProps={{className:classes.input}}
                />
                <ErrorMessage visible={touched.email} error={errors.email} />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  type="password" 
                  name="password" 
                  label="Password"
                  variant="outlined"
                  value={values.password}
                  onChange={e => setFieldValue("password", e.target.value)}
                  className={classes.TextField} 
                  InputProps={{className:classes.input}}
                />
                <ErrorMessage visible={touched.password} error={errors.password} />
              </Grid>
            </Grid>
            <p style={{ color: '#00CCFF', textAlign: 'right', cursor: 'pointer' }} onClick={() => {
              if(!values["email"]){
                errors.email='email is required';
                setInfo('email is required');
                setmessageType('error');
                return;
              }
              handleForgotPassword(values["email"])
            }}>Forgot password?</p>
            <Button type="submit" variant="contained" style={{ color: 'white', backgroundColor: '#EE5C53',borderRadius:'10px' }} fullWidth className={classes.submit}>
              Login
            </Button>
          </Form>
        )}
        </Formik>
        <p style={{fontSize:'1.2em'}}>Haven't registered? <Link href={Routes.USER_REGISTER} style={{color: '#00CCFF'}}>Register</Link></p>
    </div>}
    </Container>
    <Footer />
    </>
  );
}
