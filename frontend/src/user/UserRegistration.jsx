import React, { useState } from 'react';
import { LockOutlined } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { Grid, TextField, Container, makeStyles, CssBaseline, Button, Typography, Link } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ErrorMessage from '../components/ErrorMessage';
import { userRegister } from '../api/auth';
import { useHistory } from 'react-router-dom';
import Routes from '../utils/routes';
import LoadingPage from '../components/LoadingPage';
import Message from '../components/Message';
import Footer from '../components/Footer';
import logo from '../assets/android-chrome-512x512.png';


const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("User name"),
  email: Yup.string().required().email().label("Email"),
  phoneNo: Yup.number().required().label("Mobile Number"),
  password: Yup.string().required().min(6).label("Password")
});

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      padding: 10,
      color: 'white',
      borderRadius: 30,
      margin: 20,
    },
    form: {
      justifyContent: 'center',
      padding: 10,
      alignItems: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error: {
      fontSize: 14,
      color: 'red',
    },
    TextField: {
      width: '100%',
      backgroundColor: '#fafafa',
    },
    input:{
      borderRadius:'15px',
      borderColor:'black'
    }
}));

function phonenumber(inputtxt)
{
  const phoneno = /^\d{10}$/;
  if(inputtxt.match(phoneno))
  {
    return true;
  } else{
    return false;
  }
}


export default function UserRegistration(props) {
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setmessageType] = useState('');
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const handleSubmit = async ({ username, email, phoneNo, password },{ resetForm }) => {
    
    if(!phonenumber(phoneNo)){
      setInfo('Mobile number must be 10 digit');
      setmessageType("error");
      return;
    }
    setLoading(true);
    const body = {
      name:username.trim(),
      emailId:email.trim().toLowerCase(), 
      phoneNo:phoneNo.trim(),
      password:password,
    }
    const response = await userRegister(body);
    if(!response.ok){
      console.log(response.problem);
      setInfo(response.data.message);
      setmessageType("error");
      setLoading(false);
      return;
    }
    resetForm();
    setTimeout(() => {
      setLoading(false);
      history.push(`${Routes.USER_VERIFY}?email=${email}`);
    }, 500);
  }
  return (
    <>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    {loading && <LoadingPage /> }
    {info && <Message message={info} show={true} type={messageType} setMessage={setInfo} />}
    {!loading && <div className={classes.paper}>
        <img alt="hhc-logo" src={logo} width={200} />
        <Typography component="h1" variant="h5" style={{ fontWeight: 'bold', textDecorationLine: 'underline', color: '#EE5C53' }}>
          Register
        </Typography>
        <Formik
        initialValues={{ username: '', email: '', phoneNo: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
        {({ setFieldValue, errors, touched, values }) => (
          <Form className={classes.form}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField 
                    type="text" 
                    name="username" 
                    label="Full name" 
                    variant="outlined" 
                    value={values.username}
                    onChange={e => setFieldValue( "username", e.target.value)}
                    className={classes.TextField} 
                    InputProps={{className:classes.input}}
                />
                <ErrorMessage visible={touched.username} error={errors.username} />
              </Grid>
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
                  type="tel" 
                  name="phoneNo" 
                  label="Mobile Number"
                  variant="outlined"
                  value={values.phoneNo}
                  onChange={e => setFieldValue( "phoneNo", e.target.value)}
                  className={classes.TextField}
                  InputProps={{className:classes.input}}
                />
                <ErrorMessage visible={touched.phoneNo} error={errors.phoneNo} />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  type="password" 
                  name="password" 
                  label="Password"
                  variant="outlined"
                  value={values.password}
                  onChange={e => setFieldValue( "password", e.target.value)}
                  className={classes.TextField} 
                  InputProps={{className:classes.input}}
                />
                <ErrorMessage visible={touched.password} error={errors.password} />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
              <Checkbox
               checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                color="primary"
              />
              }
              style={{ marginTop:15}}
              label={`Agree to Terms and Conditions`}
            />
            <FormControlLabel
              control={
              <Checkbox
               checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
              }
              label={`Agree to Privacy Policy`}
              style={{ marginTop:15}}
            />
            <Button type="submit" variant="contained" style={{ color: 'white', backgroundColor: '#EE5C53',borderRadius:'10px' }} fullWidth className={classes.submit}>
              Register
            </Button>
            <p style={{fontSize:'1.2em'}}>Already Registered? <Link href={Routes.USER_LOGIN} style={{color: '#00CCFF'}}>Login</Link></p>
          </Form>
        )}
        </Formik>
    </div>}
    </Container>
    <Footer />
    </>
  );
}
