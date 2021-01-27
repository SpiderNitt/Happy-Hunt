import React from 'react';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import { withRouter } from 'react-router-dom'
import './admin.css'

const MissionCard = (props) => {
    const { history } = props;
    const renderType = (type) => {
        const object = {
            'Picture': <CameraAltIcon fontSize="large" color="primary" />,
            'Text': <TextFormatIcon fontSize="large" color="primary" />,
            'Picture and Location': <LocationOnIcon fontSize="large" color="secondary" />,
            'Video': <CameraAltIcon fontSize="large" color="secondary" />,
            '': <LocationOnIcon fontSize="large" color="secondary" />
        }
        return object[type];
    }
    return (
        <div className='mission-card'>
            <div className='mission-card-img'>
                {renderType(props.values['answer_Type'])}
            </div>
            <div className='mission-card-name'>
                <p>{`Mission ${props.index}`}</p>
            </div>
        </div>
    );
}

export default withRouter(MissionCard);