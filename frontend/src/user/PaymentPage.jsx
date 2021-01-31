import React from 'react';
import Lottie from 'react-lottie';
import useScript from '../hooks/useScript';
import animationData from '../assets/animations/payment.json';
import { Grid } from '@material-ui/core';

function PaymentPage(props) {
    useScript(
        "https://checkout.razorpay.com/v1/payment-button.js", 
        "form1", 
        { 
            key: "data-payment_button_id", 
            value: "pl_GVu6sNoBacor2N" 
        }
    );
    useScript(
        "https://checkout.razorpay.com/v1/payment-button.js", 
        "form1", 
        { 
            key: "data-payment_button_id", 
            value: "pl_GVuB6WNY5eOgND" 
        }
    );
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div style={{ display:'flex', flexDirection: 'column', alignItems:'center' }}>
            <div>
                <Lottie 
                    options={defaultOptions}
                    height={200}
                />
            </div>
            <Grid container style={{ marginTop: '10%' }}>
                <Grid item sm={12} style={{ marginLeft: '7%' }}>
                    <form className="form1"></form>
                </Grid>
                <Grid item sm={12} style={{ marginLeft: '7%' }}>
                    <form className="form2"></form>
                </Grid>
            </Grid>
        </div>
    );
}

export default PaymentPage;