import { Button } from '@material-ui/core';
import React from 'react';

function Home(props) {
    return (
        <>
            <h3>Happy Hunt Challenge</h3>
            <Button href="/register" variant="outlined" color="secondary">Register</Button>
            <Button href="/happy-hunt" variant="outlined" color="secondary">start</Button>
        </>
    );
}

export default Home;