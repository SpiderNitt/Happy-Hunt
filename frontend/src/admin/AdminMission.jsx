import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AdminMissionListItem from './AdminMissionListItem';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import colors from '../utils/colors';
import Routes from '../utils/routes'
import { withRouter } from 'react-router-dom'
import client from '../api/client';
import LoadingPage from '../components/LoadingPage';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    position: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        marginTop: '10px',
        width: '600px',
        height: '500px',
        overflow: 'auto',
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
    const [dense, setDense] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await client.get('api/admin/mission')
            setData(result.data.Missions);
            setLoading(false);
        }
        fetchData();
    }, []);
    return (
        <div>
            {loading && <LoadingPage />}
            {!loading &&
                <div className={classes.position}>
                    <div className={classes.demo}>
                        <List dense={dense}>
                            {data.map((mission, index) => (
                                <AdminMissionListItem key={mission._id} values={mission} index={index + 1} />
                            ))}
                        </List>
                    </div>
                </div>
            }
            <Fab color="primary" className={classes.fab} onClick={() => { history.push(Routes.ADMIN_NEW_MISSION) }}>
                <AddIcon fontSize="large" color={colors.white} />
            </Fab>

        </div >
    )
}

export default withRouter(AdminMission);