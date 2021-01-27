import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    bold: {
        fontWeight: 'bold'
    }
}))


function MissionListItem(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <p><span className={classes.bold}>{props.title}</span> {props.value}</p>
        </div>
    )
}

export default MissionListItem;