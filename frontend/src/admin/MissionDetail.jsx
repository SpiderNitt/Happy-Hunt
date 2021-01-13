import React, { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MissionListItem from './MissionListItem'
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 700,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        paddingLeft: '10px'
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}))


function MissionDetail(props) {
    const classes = useStyles();
    useEffect(() => {
        console.log(props.match.params.id);
    }, []);
    return (
        <div style={{
            position: 'absolute',
            left: '55%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            marginTop: '10px',
            width: '600px'
        }}>
            <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center'
            }}>
                <h1>Mission 1</h1>
            </div>
            <div className={classes.root}>
                <div className={classes.demo}>
                    <MissionListItem title='Location: ' />
                    <MissionListItem title='Category: ' />
                    <MissionListItem title='Clue/Mission: ' />
                    <MissionListItem title='Answer Type: ' />
                    <MissionListItem title='Answer: ' />
                    <MissionListItem title='Other information: ' />
                </div>
            </div>
        </div>
    )
}

export default MissionDetail;