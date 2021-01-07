import React from 'react';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import { withRouter } from 'react-router-dom'
import './admin.css'


const MissionCard = (props) => {
    const { history } = props;
    const renderType = (type) => {
        if (type === "1") {
            return (<CameraAltIcon fontSize="large" color="secondary" />);
        }
        else if (type === "2") {
            return (<LocationOnIcon fontSize="large" />);
        }
        else {
            return (<TextFormatIcon fontSize="large" color="primary" />);
        }
    }
    return (
        <div className='mission-card' onClick={() => { history.push('/missiondetail') }}>
            <div className='mission-card-img'>
                {renderType(props.type)}
            </div>
            <div className='mission-card-name'>
                <p>Mission 1</p>
            </div>
        </div>
    );
}

export default withRouter(MissionCard);