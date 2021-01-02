import { Button } from '@material-ui/core';
import React from 'react';

function Home(props) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
            <h3>Happy Hunt Challenge</h3>
            <Button href="/register" variant="outlined" color="secondary">Register</Button>
            <br/>
            <Button href="/happy-hunt" variant="outlined" color="secondary">start</Button>
        </div>
    );
}

export default Home;