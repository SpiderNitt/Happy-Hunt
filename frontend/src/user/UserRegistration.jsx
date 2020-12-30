import React from 'react';
import { LockOutlined } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { Grid, TextField, Container, makeStyles, CssBaseline, Button, Typography } from '@material-ui/core';

import ErrorMessage from '../components/ErrorMessage';

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("User name"),
    email: Yup.string().required().email().label("Email"),
    age: Yup.number().min(18).required().label("Age"),
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
    }
}));

export default function UserRegistration() {

    const classes = useStyles();

    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <div className={classes.avatar}>
            <LockOutlined style={{ fontSize: 40 }} />
          </div>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Formik
          initialValues={{ username: '', email: '', age: 0 }}
          validationSchema={validationSchema}
          onSubmit={values => console.log(values)}
          >
          {({ setFieldValue, errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField 
                      type="text" 
                      name="username" 
                      label="Username" 
                      variant="outlined" 
                      onChange={e => setFieldValue( "username", e.target.value)}
                      className={classes.TextField} 
                  />
                  <ErrorMessage visible={touched.username} error={errors.username} />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    type="text" 
                    name="email" 
                    label="Email Address" 
                    variant="outlined" 
                    onChange={e => setFieldValue("email", e.target.value)}
                    className={classes.TextField}
                  />
                  <ErrorMessage visible={touched.email} error={errors.email} />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    type="number" 
                    name="age" 
                    label="Mobile Number"
                    min={18}
                    variant="outlined"
                    onChange={e => setFieldValue( "age", e.target.value)}
                    className={classes.TextField} 
                  />
                  <ErrorMessage visible={touched.age} error={errors.age} />
                </Grid>
              </Grid>
              <Button type="submit" variant="outlined" color="secondary" fullWidth className={classes.submit}>
                Submit
              </Button>
            </Form>
          )}
          </Formik>
      </div>
      </Container>
    );
}
