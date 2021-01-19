import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { TextField, Container, makeStyles, CssBaseline, Button, Typography } from '@material-ui/core';

import ErrorMessage from '../components/ErrorMessage';
import team from '../assets/animations/team.gif';
import { teamRegister } from '../api/team';
import { useHistory } from 'react-router';
import Routes from '../utils/routes';
import { AuthContext } from '../api/authContext';

const validationSchema = Yup.object().shape({
    teamName: Yup.string().required().label("Team Name"),
});

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(6),
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
    const classes = useStyles();
    const History = useHistory();
    const handleSubmit = async({ teamName }, { resetForm }) => {
      const response = await teamRegister({
        teamName: teamName
      });
      if(!response.ok){
        console.log(response.status ,response.originalError, response.problem);
        return;
      };
      console.log(response.data);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      localStorage.setItem("userInfo", JSON.stringify({...userInfo, teamID: response.data.TeamId}));
      resetForm();
      setTimeout(() => {
        History.push(Routes.USER_PROFILE);
      }, 500);
    }

    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <img src={team} alt="team" width={200} />
          <Typography component="h1" variant="h5" style={{ fontFamily: 'Lucida Handwriting', fontWeight: 'bold' }}>
            Register your team
          </Typography>
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
            </Form>
          )}
          </Formik>
      </div>
      </Container>
    );
}

export default CreateTeam;