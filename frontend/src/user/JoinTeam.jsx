import { Button, Container, Grid, makeStyles, TextField } from '@material-ui/core';
import { GroupAdd } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import React from 'react';
import ErrorMessage from '../components/ErrorMessage';
import * as Yup from "yup";
import { userMobileNoVerify } from '../api/auth';
import Routes from '../utils/routes';
import { joinTeam } from '../api/team';

const validationSchema = Yup.object().shape({
    teamId: Yup.string().required().label("Team ID"),
});

const useStyles = makeStyles((theme) => ({
    root: { 
        display: 'flex', 
        flexDirection: 'column',  
        alignItems: 'center',
        paddingTop: '20%',
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
    const handleSubmit = async({teamId}, { resetForm }) => {
        const response = await joinTeam(teamId);
        if(!response.ok){
            console.log(response.problem);
            console.log(response);
            return;
        }
        console.log(response.data);
        resetForm();
        // props.history.push(Routes.USER_PROFILE);
    }
    return (
        <Container className={styles.root}>
            <div style={{ fontSize: 50 }}>
                <GroupAdd fontSize="inherit" />
            </div>
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