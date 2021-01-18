import { Button, Container, Grid, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import { MessageOutlined } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import * as Yup from "yup";
import { userMobileNoVerify } from '../api/auth';
import Routes from '../utils/routes';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../api/authContext';
const queryString = require('query-string');

const validationSchema = Yup.object().shape({
    otp: Yup.string().required().label("OTP"),
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

function VerificationEmail(props) {
    const styles = useStyles();
    const auth = useContext(AuthContext);
    const parsed = queryString.parse(props.location.search);
    const handleSubmit = async({otp}, { resetForm }) => {
        const body = {
            mobileNo:parsed.mobileNo,   
            otp:otp
        }
        const response = await userMobileNoVerify(body);
        if(!response.ok){
            console.log(response.problem);
            console.log(response.data);
            return;
        }
        const {exp} = await jwtDecode(response.data.token)
        const data = {
          token: response.data.token,
          expiresAt: exp,
          userInfo: response.data.result
        }
        await auth.setAuthState(data);
        resetForm();
        setTimeout(() => {
            props.history.push(Routes.HOME);
        }, 500);
    }
    return (
        <Container className={styles.root}>
            <div style={{ fontSize: 50 }}>
                <MessageOutlined fontSize="inherit" />
            </div>
            <Formik
            initialValues={{ otp: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
            {({ setFieldValue, errors, touched, values }) => (
                <Form className={styles.form}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                    <TextField 
                        type="text" 
                        name="otp" 
                        label="OTP" 
                        variant="outlined" 
                        value={values.otp}
                        onChange={e => setFieldValue( "otp", e.target.value)}
                        className={styles.TextField} 
                    />
                    <ErrorMessage visible={touched.otp} error={errors.otp} />
                    </Grid>
                </Grid>
                <Button type="submit" variant="outlined" color="secondary" fullWidth className={styles.submit}>
                Verify
                </Button>
                </Form>
            )}
            </Formik>
            <Typography variant="button" style={{ marginTop: 30, fontWeight: 'bold' }}>
                Verify your Mobile Number
            </Typography>
            <Link
            component="button"
            variant="body1"
            onClick={() => {
                console.info("resent email!!");
            }}
            >
                resend OTP
            </Link>
        </Container>
    );
}

export default VerificationEmail;