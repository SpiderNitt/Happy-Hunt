import React from 'react';
import Button from '@material-ui/core/Button';

function Rules(props) {
    return (
        <div>
            <h1>
                Rules
            </h1>
            <ul>
                Rule 1
            </ul>
            <ul>
                Rule 2
            </ul>

            <Button variant="contained" color="primary" href="/main" style={{margin: 15}}>
                Continue
            </Button>

            <Button variant="contained" color="secondary" href="/starting">
                Back
            </Button>
          
        </div>
    );
}

export default Rules;