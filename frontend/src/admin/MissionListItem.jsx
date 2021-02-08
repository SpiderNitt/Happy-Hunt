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
    React.useEffect(() => {
        if (props.eval) {
            console.log(props.value);
        }
    }, [])
    return (
        <div className={classes.root}>
            {props.eval && props.value.length > 0 && <div>
                <p className={classes.bold}>{props.title}</p>
                {
                    props.value.map((clue, index) => (
                        <div>
                            <p><span className={classes.italic}>Part {index + 1}:</span> {clue.text}</p>
                            {clue.photos !== "" && <img src={clue.photos} style={{ width: '300px', height: '300px' }} />}
                        </div>
                    ))
                }
            </div>}
            {!props.eval && <p><span className={classes.bold}>{props.title}</span> {props.value}</p>}
        </div>
    )
}

MissionListItem.defaultProps = {
    eval: false
}

export default MissionListItem;