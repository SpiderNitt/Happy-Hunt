import { Container, Typography } from '@material-ui/core';
import React from 'react';
import Footer from '../components/Footer';

function AboutUs(props) {
    return (
        <Container fixed maxWidth="md">
            <Typography component="h1" variant="h4" style={{ fontWeight: 'bold', marginTop: '10%' }}>
                About us
            </Typography>
            <p>
            The Happy Hunt Challenge is a city-based scavenger hunt, organised by Event Speciale, where the participants, traveling within the safety of their personal vehicles, crack clues and carry out missions - identifying and engaging with the famous, unique, and undiscovered locations in their city – all for a chance to win prizes and ‘a once in a lifetime experience’
            </p>
            <Footer />
        </Container>
    );
}

export default AboutUs;