import React, { useContext, useState } from 'react';
import { ArrowForward } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { Grid, TextField, Container, makeStyles, CssBaseline, Button, Typography, Avatar, Link } from '@material-ui/core';

import ErrorMessage from '../components/ErrorMessage';
import { resetPassword, userLogin } from '../api/auth';
import Routes from '../utils/routes';
import { useHistory } from 'react-router';
import { AuthContext } from '../api/authContext';
import jwtDecode from 'jwt-decode';
import LoadingPage from '../components/LoadingPage';
import SuccessAnimation from '../components/SuccessAnimation';
import Message from '../components/Message';
import Footer from '../components/Footer';
const queryString = require('query-string');

const validationSchema = Yup.object().shape({
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
      marginTop: 20,
      marginBottom: 20,
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

export default function ForgotPassword(props) {
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setmessageType] = useState('');
  const [successLogin, setSuccessLogin] = useState(false);
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const History = useHistory();
  const parsed = queryString.parse(props.location.search);
  const handleSubmit = async({ password },{ resetForm }) => {
    setLoading(true);
    const body = {
      password:password,
      emailId: parsed.emailId,
      verificationId: parsed.id
    }
    const response = await resetPassword(body);
    if(!response.ok){
      setLoading(false);
      console.log(response.problem);
      console.log(response.data);
      setInfo(response.data.message);
      setmessageType("error");
      return;
    }
    setLoading(false);
    resetForm();
    setTimeout(() => {
      History.push(Routes.USER_LOGIN);
    }, 1000);
  }
  return (
    <>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    {loading && <LoadingPage /> }
    {info && <Message message={info} show={true} type={messageType} />}
    {(!loading && !successLogin) && <div className={classes.paper}>
        <Typography component="h1" variant="h4" style={{ fontWeight: 'bold' }}>
          Reset Password
        </Typography>
        <Formik
        initialValues={{ password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
        {({ setFieldValue, errors, touched, values }) => (
          <Form className={classes.form}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField 
                  type="password" 
                  name="password" 
                  label="New Password"
                  variant="outlined"
                  value={values.password}
                  onChange={e => setFieldValue("password", e.target.value)}
                  className={classes.TextField} 
                />
                <ErrorMessage visible={touched.password} error={errors.password} />
              </Grid>
            </Grid>
            <Button type="submit" variant="outlined" color="secondary" fullWidth className={classes.submit}>
              Submit
            </Button>
          </Form>
        )}
        </Formik>
    </div>}
    </Container>
    <Footer />
    </>
  );
}
