import React, { useEffect, useState } from 'react';
import MissionCard from './MissionCard'
import client from '../api/client';
import { Link } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';

const Mission = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
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
                <div className="mission-container">
                    {!loading && data.map((mission, index) => (
                        <Link to={`/admin/missiondetail/${mission._id}`}><MissionCard key={mission._id} values={mission} index={index + 1} /></Link>
                    ))}
                </div>
            }
        </div>
    );
}

export default Mission;