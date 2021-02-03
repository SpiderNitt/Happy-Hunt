import { Button, Container, Grid, makeStyles, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import * as Yup from "yup";
import Routes from '../utils/routes';
import { joinTeam } from '../api/team';
import Animation from '../components/Animation';
import { useHistory } from 'react-router';
import Message from '../components/Message';

const validationSchema = Yup.object().shape({
    teamId: Yup.string().required().label("Team ID"),
});

const useStyles = makeStyles((theme) => ({
    root: { 
        display: 'flex', 
        flexDirection: 'column',  
        alignItems: 'center',
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
    marginBottom: 5,
    }
}))

function JoinTeam(props) {
    const styles = useStyles();
    const history = useHistory();
    const [message, setmessage] = useState('')
    const [messageType, setmessageType] = useState('')
    const handleSubmit = async({teamId}, { resetForm }) => {
        const response = await joinTeam(teamId.trim());
        if(!response.ok){
            console.log(response.status ,response.originalError, response.problem);
            console.log(response.data.message);
            setmessage(response.data.message);
            setmessageType("error");
            return;
        }
        setmessage(response.data.message);
        setmessageType("success");
        resetForm();
        setTimeout(() => {
            history.push(Routes.USER_PROFILE);
        }, 1000);
    }

    return (
        <Container className={styles.root}>
            {message && <Message message={message} show={true} type={messageType} />}
            <Animation AnimationRoute={'team'} />
            <Formik
            initialValues={{ teamId: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
            {({ setFieldValue, errors, touched, values }) => (
                <Form className={styles.form}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                    <TextField 
                        type="text" 
                        name="teamId" 
                        label="Team ID" 
                        variant="outlined" 
                        value={values.otp}
                        onChange={e => setFieldValue( "teamId", e.target.value)}
                        className={styles.TextField} 
                    />
                    <ErrorMessage visible={touched.teamId} error={errors.teamId} />
                    </Grid>
                </Grid>
                <Button type="submit" variant="outlined" color="secondary" fullWidth className={styles.submit}>
                Join
                </Button>
                </Form>
            )}
            </Formik>
        </Container>
    );
}

export default JoinTeam;