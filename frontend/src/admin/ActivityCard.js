import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import LandScape from '../assets/images.jpeg'


const ActivityCard = () => {
    return (
        <div className="activity-card-container">
            <div className="activity-card-header">
                <div className="person-icon">
                    <PersonIcon fontSize="large" />
                </div>
                <div className="person-details">
                    <p style={{ fontWeight: 'bold' }}>Squad 18</p>
                    <p>00:00 PM</p>
                </div>
                <div className="reject-button">
                    <Button variant="contained" color="secondary">
                        REJECT
                    </Button>
                </div>
            </div>
            <div className="submitted-image">
                <img src={LandScape} alt="sample" />
            </div>
        </div>
    )
}

export default ActivityCard;