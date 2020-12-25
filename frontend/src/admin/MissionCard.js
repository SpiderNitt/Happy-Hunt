import React from 'react';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import './admin.css'


const MissionCard = (props) => {
    const renderType = (type) => {
        if (type === "1") {
            return (<CameraAltIcon fontSize="large" />);
        }
        else if (type === "2") {
            return (<LocationOnIcon fontSize="large" />);
        }
        else {
            return (<TextFormatIcon fontSize="large" />);
        }
    }
    return (
        <div className='mission-card'>
            <div className='mission-card-img'>
                {renderType(props.type)}
            </div>
            <div className='mission-card-name'>
                <p>Mission 1</p>
            </div>
        </div>
    );
}

export default MissionCard;