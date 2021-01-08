import { Grid } from '@material-ui/core';
import React from 'react';
import NavBar from './NavBar';
import TopNav from './TopNav';

function Template(props) {
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <TopNav />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 70}}>
                    <NavBar />
                </Grid>
            </Grid>
        </div>
    );
}

export default Template;