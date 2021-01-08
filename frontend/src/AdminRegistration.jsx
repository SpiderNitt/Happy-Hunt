import React from 'react';
import { SupervisorAccount } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { Grid, TextField, Container, makeStyles, CssBaseline, Button, Typography } from '@material-ui/core';

import ErrorMessage from './components/ErrorMessage';
import colors from './utils/colors';
import { AdminRegister } from './api/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      padding: 10,
      color: 'white',
      borderRadius: '50%',
      margin: 10,
    },
    form: {
      width: '100%',
      marginTop: 30,
    },
    submit: {
      marginTop: 20,
    },
    TextField: {
      backgroundColor: colors.light,
    }
}));

export default function AdminRegistration() {

    const classes = useStyles();

    const handleSubmit = async ({ email }, { resetForm }) => {
      const response = await AdminRegister(email);
      if(!response.ok){
        console.log(response.problem);
        console.log(response.data);
        return;
      }
      console.log(response.data);
      resetForm();
    }

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
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          >
          {({ setFieldValue, errors, touched, values }) => (
            <Form className={classes.form}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField 
                    type="email" 
                    name="email" 
                    label="Email Address" 
                    variant="filled" 
                    value={values.email}
                    onChange={e => setFieldValue("email", e.target.value)}
                    className={classes.TextField}
                    fullWidth
                  />
                  <ErrorMessage visible={touched.email} error={errors.email} />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="secondary" fullWidth className={classes.submit}>
                Add
              </Button>
            </Form>
          )}
          </Formik>
      </div>
      </Container>
    );
}
