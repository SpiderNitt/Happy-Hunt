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

function AdminMissionListItem(props) {
    const [secondary, setSecondary] = React.useState(false);
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
                <IconButton edge="end" aria-label="delete" style={{ marginRight: 10 }}>
                    <EditIcon style={{ color: colors.primary }} />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon style={{ color: colors.secondary }} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default AdminMissionListItem;