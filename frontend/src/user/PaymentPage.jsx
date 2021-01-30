import React from 'react';
import Lottie from 'react-lottie';
import useScript from '../hooks/useScript';
import animationData from '../assets/animations/payment.json';

function PaymentPage(props) {
    useScript(
        "https://checkout.razorpay.com/v1/payment-button.js", 
        "form", 
        { 
            key: "data-payment_button_id", 
            value: "pl_GMLD1LEpcdAsm6" 
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
            <div style={{ marginTop: 100 }}>
                <form className="form"></form>
            </div>
        </div>
    );
}

export default PaymentPage;
