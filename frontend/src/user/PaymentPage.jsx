import React from 'react';
import useScript from '../hooks/useScript';

function PaymentPage(props) {
    useScript(
        "https://checkout.razorpay.com/v1/payment-button.js", 
        "form", 
        { 
            key: "data-payment_button_id", 
            value: "pl_GMLD1LEpcdAsm6" 
        }
    );
    return (
        <form className="form"></form>
    );
}

export default PaymentPage;
