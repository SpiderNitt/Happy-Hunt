import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    bold: {
        fontWeight: 'bold'
    }
}))


function MissionListItem(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <p><span className={classes.bold}>{props.title}</span>&emsp;Lorem ipsum dolor sit amet, consectetur adipis</p>
        </div>
    )
}

export default MissionListItem;