import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    bold: {
        fontWeight: 'bold'
    },
    italic: {
        fontStyle: 'italic'
    },
    img: {
        width: '300px',
        height: '300px',
    }
}))


function MissionListItem(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.eval && props.value.length === 3 && <div>
                <p className={classes.bold}>{props.title}</p>
                <p><span className={classes.italic}>Part A:</span> {props.value[0]}</p>
                <p><span className={classes.italic}>Part B:</span> {props.value[1]}</p>
                <img src={props.value[2]} alt='picture clue' className={classes.img} />
            </div>}
            {props.eval && props.value.length === 1 && <div>
                <p className={classes.bold}>{props.title}</p>
                <p><span className={classes.italic}>Part A:</span> {props.value[0]}</p>
            </div>}
            {!props.eval && <p><span className={classes.bold}>{props.title}</span> {props.value}</p>}
        </div>
    )
}

MissionListItem.defaultProps = {
    eval: false
}

export default MissionListItem;