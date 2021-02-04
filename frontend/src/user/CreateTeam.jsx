import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { TextField, Container, makeStyles, CssBaseline, Button } from '@material-ui/core';

import ErrorMessage from '../components/ErrorMessage';
import { teamRegister } from '../api/team';
import { useHistory } from 'react-router';
import Routes from '../utils/routes';
import Message from '../components/Message';
import Animation from '../components/Animation';

const validationSchema = Yup.object().shape({
  teamName: Yup.string().required().label("Team Name"),
});

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    submit: {
      marginTop: 30,
    },
    error: {
      fontSize: 14,
      color: 'red',
    },
    TextField: {
      width: '100%',
    }
}));


function CreateTeam(props) {
  const [info,setInfo] = useState('');
  const [messageType,setMessageType] = useState('');
  const classes = useStyles();
  const History = useHistory();
  const handleSubmit = async({ teamName }, { resetForm }) => {
    const response = await teamRegister({
      teamName: teamName.trim()
    });
    if(!response.ok){
      console.log(response.status ,response.originalError, response.problem);
      console.log(response.data.message);
      setInfo(response.data.message);
      setMessageType("error");
      return;
    };
    setInfo("Team registered successfully!");
    setMessageType("success");
    console.log(response.data);
    await localStorage.setItem("token", response.data.JWTtoken);
    await localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
    await localStorage.setItem("expiresAt", response.data.expiration);
    resetForm();
    setTimeout(() => {
      History.push(Routes.USER_PROFILE);
    }, 1500);
  }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    {info && <Message show={true} message={info} type={messageType} setMessage={setInfo} />}
    <div className={classes.paper}>
        <Animation AnimationRoute={'team'} />
        <Formik
        initialValues={{ teamName: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
        {({ setFieldValue, errors, touched }) => (
          <Form className={classes.form}>
              <TextField 
                  type="text" 
                  name="teamName" 
                  label="Team Name" 
                  variant="outlined" 
                  onChange={e => setFieldValue( "teamName", e.target.value)}
                  className={classes.TextField} 
              />
              <ErrorMessage visible={touched.teamName} error={errors.teamName} />
              <Button type="submit" variant="outlined" color="secondary" fullWidth className={classes.submit}>
                Register
              </Button>
              <br/>
              <br/>
              <span>Not paid? </span>
              <a href={Routes.USER_PAYMENT}>
                Pay here!
              </a>
          </Form>
        )}
        </Formik>
    </div>
    </Container>
  );
}

export default CreateTeam;