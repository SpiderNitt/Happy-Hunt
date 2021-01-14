import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AdminMissionListItem from './AdminMissionListItem';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import colors from '../utils/colors';
import Routes from '../utils/routes'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(5),
        right: theme.spacing(7),
    },
}));

function AdminMission(props) {
    const { history } = props;
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    return (
        <div>
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                marginTop: '10px',
                width: '600px'
            }}>
                <div className={classes.demo}>
                    <List dense={dense}>
                        <AdminMissionListItem type="1" key="1" />
                        <AdminMissionListItem type="2" key="2" />
                        <AdminMissionListItem type="1" key="3" />
                        <AdminMissionListItem type="3" key="4" />
                        <AdminMissionListItem type="2" key="5" />
                        <AdminMissionListItem type="1" key="6" />
                        <AdminMissionListItem type="3" key="7" />
                        <AdminMissionListItem type="1" key="8" />
                        <AdminMissionListItem type="2" key="9" />
                    </List>
                </div>
            </div>
            <Fab color="primary" className={classes.fab} onClick={() => { history.push(Routes.ADMIN_NEW_MISSION) }}>
                <AddIcon fontSize="large" color={colors.white} />
            </Fab>

        </div>
    )
}

export default withRouter(AdminMission);