import { Button, Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import client from '../api/client';
import LoadingPage from '../components/LoadingPage';
import Message from '../components/Message';
import { useHistory } from 'react-router-dom'
import  Routes from '../utils/routes';
const queryString = require('query-string');

function UserAcceptReject(props) {
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [messageType, setmessageType] = useState('');
    const parsed = queryString.parse(props.location.search);
    const history = useHistory();
    const handleAccept = async() => {
        setLoading(true);
        const response = await client.get(`/api/team/accept?userId=${parsed.userId}`);
        setLoading(false);
        if(!response.ok){
            setInfo('error accepting request');
            setmessageType('error');
            console.log(response.originalError);
            return;
        }
        setInfo('Request accepted!');
        setmessageType('success');
        setTimeout(() => {
            history.push(Routes.USER_PROFILE)
        }, 1000);
    }
    const handleReject = async() => {
        setLoading(true);
        const response = await client.get(`/api/team/reject?userId=${parsed.userId}`);
        setLoading(false);
        if(!response.ok){
            setInfo('error rejecting request');
            setmessageType('error');
            console.log(response.originalError);
            return;
        }
        setInfo('Request rejected!');
        setmessageType('success');
        setTimeout(() => {
            history.push(Routes.USER_PROFILE)
        }, 1000);
    }
    return (
        <Container maxWidth="md">
            {loading && <LoadingPage />}
            {info && <Message message={info} show={true} type={messageType} />}
            <Typography component="h1" variant="h5" style={{ fontWeight: 'bold', textDecorationLine: 'underline', color: '#EE5C53' }}>
                User Request
            </Typography>
            <Container fixed maxWidth="sm" style={{ marginTop: '20%', marginBottom: 20 }}>
            <Typography component="body" style={{ marginBottom: 20 }}>
                {parsed.name} has requested to join your team
            </Typography>
            <Button variant="outlined"  style={{ backgroundColor: '#F2F2F3', color: '#213B4B', outline: 1 , outlineColor: '#213B4B', width: '100%', marginBottom: 20 }} onClick={handleAccept}>
                Accept
            </Button>
            <br/>
            <Button variant="contained"  style={{ backgroundColor: '#213B4B', color: 'white', width: '100%' }} onClick={handleReject}>
                Reject
            </Button>
            </Container>
        </Container>
    );
}

export default UserAcceptReject;