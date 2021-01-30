import React, { useContext, useState } from 'react';
import { ArrowForward } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { Grid, TextField, Container, makeStyles, CssBaseline, Button, Typography, Avatar } from '@material-ui/core';

import ErrorMessage from '../components/ErrorMessage';
import { userLogin } from '../api/auth';
import Routes from '../utils/routes';
import { useHistory } from 'react-router';
import { AuthContext } from '../api/authContext';
import jwtDecode from 'jwt-decode';
import LoadingPage from '../components/LoadingPage';
import SuccessAnimation from '../components/SuccessAnimation';
import Message from '../components/Message';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
      margin: theme.spacing(3, 0, 2),
    },
    TextField: {
      width: '100%',
      marginTop: 10,
      backgroundColor: '#fafafa',
    },
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
      emailId:email,
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
    setInfo("Login Successful!");
    setmessageType("success");
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
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    {loading && <LoadingPage /> }
    {successLogin && <SuccessAnimation />}
    {info && <Message message={info} show={true} type={messageType} />}
    {(!loading && !successLogin) && <div className={classes.paper}>
        <Avatar className={classes.avatar} sizes='large' >
          <ArrowForward style={{ fontSize: 40 }} />
        </Avatar>
        <Typography component="h1" variant="h4" style={{ fontWeight: 'bold' }}>
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
                />
                <ErrorMessage visible={touched.password} error={errors.password} />
              </Grid>
            </Grid>
            <Button type="submit" variant="outlined" color="secondary" fullWidth className={classes.submit}>
              Login
            </Button>
          </Form>
        )}
        </Formik>
    </div>}
    </Container>
  );
}
