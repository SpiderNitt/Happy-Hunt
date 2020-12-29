import React from 'react';
import { SupervisorAccount } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { Grid, TextField, Container, makeStyles, CssBaseline, Button, Typography } from '@material-ui/core';

import ErrorMessage from './components/ErrorMessage';

const validationSchema = Yup.object().shape({
    adminName: Yup.string().required().label("Admin Name"),
    email: Yup.string().required().email().label("Email"),
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

export default function AdminRegistration() {

    const classes = useStyles();

    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <div className={classes.avatar}>
            <SupervisorAccount style={{ fontSize: 40 }} />
          </div>
          <Typography component="h1" variant="h5">
            Add Admin
          </Typography>
          <Formik
          initialValues={{ adminName: '', email: '' }}
          validationSchema={validationSchema}
          onSubmit={values => console.log(values)}
          >
          {({ setFieldValue, errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField 
                      type="text" 
                      name="adminName" 
                      label="Admin Name" 
                      variant="outlined" 
                      onChange={e => setFieldValue( "adminName", e.target.value)}
                      className={classes.TextField} 
                  />
                  <ErrorMessage visible={touched.adminName} error={errors.adminName} />
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
              </Grid>
              <Button type="submit" variant="outlined" color="secondary" fullWidth className={classes.submit}>
                Add
              </Button>
            </Form>
          )}
          </Formik>
      </div>
      </Container>
    );
}
