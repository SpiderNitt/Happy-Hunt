import React, { useEffect, useState } from 'react';
import MissionCard from './MissionCard'
import client from '../api/client';

const Mission = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await client.get('api/admin/mission')
            setData(result.data.Missions);
        }
        fetchData();
    }, []);
    return (
        <div className="mission-container">
            {data.map((mission, index) => (
                <MissionCard type="1" key={mission._id} values={mission} index={index + 1} />
            ))}
        </div>
    );
}

export default Mission;