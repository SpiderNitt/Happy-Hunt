import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import EditIcon from '@material-ui/icons/Edit';
import colors from '../utils/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import client from '../api/client';
import { withRouter } from 'react-router-dom';

function AdminMissionListItem(props) {
    const [secondary, setSecondary] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { history } = props;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteConfirm = () => {
        setOpen(false);
        const confirmDelete = async () => {
            const response = await client.delete(`api/admin/mission/delete/${props.values._id}`);
            console.log(response);
        }
        confirmDelete();
    }
    const renderType = (type) => {
        const object = {
            'Picture': <CameraAltIcon />,
            'Text': <TextFormatIcon />,
            'Picture and Location': <LocationOnIcon />,
            'Video': <CameraAltIcon />
        }
        return object[type];
    }
    return (
        <ListItem key={props.key}>
            <ListItemAvatar>
                <Avatar>
                    {renderType(props.values.Category)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`Mission ${props.index}`}
                secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" style={{ marginRight: 10 }} onClick={() => { history.push(`edit/${props.values._id}`) }}>
                    <EditIcon style={{ color: colors.primary }} />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                    <DeleteIcon style={{ color: colors.secondary }} />
                </IconButton>
            </ListItemSecondaryAction>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"DELETE MISSION"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this Mission ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        NO
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary" variant="contained" autoFocus>
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    )
}

export default withRouter(AdminMissionListItem);