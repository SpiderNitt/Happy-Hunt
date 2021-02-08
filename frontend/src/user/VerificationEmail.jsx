import {
  Container,
  CssBaseline,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { EmailOutlined } from "@material-ui/icons";
// import { Form, Formik } from 'formik';
import React, { useEffect, useState } from "react";
// import ErrorMessage from '../components/ErrorMessage';
// import * as Yup from "yup";
// import { userMobileNoVerify } from '../api/auth';
// import Routes from '../utils/routes';
// import jwtDecode from 'jwt-decode';
// import { AuthContext } from '../api/authContext';
import LoadingPage from "../components/LoadingPage";
import SuccessAnimation from "../components/SuccessAnimation";
import Message from "../components/Message";
import Footer from "../components/Footer";
import { resendEmail } from "../api/auth";
const queryString = require("query-string");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20%",
  },
  form: {
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    fontSize: 14,
    color: "red",
  },
  TextField: {
    width: "100%",
    backgroundColor: "#fafafa",
    marginBottom: 5,
  },
}));

function VerificationEmail(props) {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [messageType, setmessageType] = useState("");
  // const [successVerify, setSuccessVerify] = useState(false);
  const [email, setEmail] = useState("");
  // const auth = useContext(AuthContext);
  const parsed = queryString.parse(props.location.search);
  useEffect(() => {
    setEmail(parsed.email);
  }, [parsed.email]);
  // const handleSubmit = async({otp}, { resetForm }) => {
  //     setLoading(true);
  //     const body = {
  //         mobileNo:parsed.mobileNo,
  //         otp:otp
  //     }
  //     const response = await userMobileNoVerify(body);
  //     if(!response.ok){
  //         console.log(response.problem);
  //         console.log(response.data);
  //         setInfo(response.data.message);
  //         setmessageType("error");
  //         setLoading(false);
  //         return;
  //     }
  //     setInfo("Registration successful!");
  //     setmessageType("success");
  //     setLoading(false);
  //     setSuccessVerify(true);
  //     const {exp} = await jwtDecode(response.data.token)
  //     const data = {
  //       token: response.data.token,
  //       expiresAt: exp,
  //       userInfo: response.data.result
  //     }
  //     await auth.setAuthState(data);
  //     resetForm();
  //     setTimeout(() => {
  //         props.history.push(Routes.HOME);
  //     }, 2000);
  // }
  const handleResend = async () => {
    setLoading(true);
    const response = await resendEmail(email);
    setLoading(false);
    if (!response.ok) {
      console.log(response.status, response.originalError, response.problem);
      setInfo("Error sending email");
      setmessageType("error");
      return;
    }
    setInfo("Email sent successfully!");
    setmessageType("success");
    return;
  };
  return (
    <Container maxWidth='md'>
      <CssBaseline />
      {loading && <LoadingPage />}
      {info && <Message message={info} show={true} type={messageType} />}
      <div className={styles.root}>
        <div style={{ fontSize: 50 }}>
          <EmailOutlined fontSize='inherit' />
        </div>
        {/* <Formik
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
            </Formik> */}
        <Typography
          variant='button'
          style={{ marginTop: 30, fontWeight: "bold" }}>
          We have sent you an email to {email} with the verification link,
          Please confirm your email by clicking on the link and completing the
          verification
        </Typography>
        <Link component='button' variant='body1' onClick={handleResend}>
          resend email
        </Link>
      </div>
      <Footer />
    </Container>
  );
}

export default VerificationEmail;
