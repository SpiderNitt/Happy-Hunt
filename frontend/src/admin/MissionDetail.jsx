import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MissionListItem from './MissionListItem'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import client from '../api/client';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 700,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        paddingLeft: '10px'
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}))

const dummyData = {
    mission: {
        Location: { Lat: 23, Long: 24 },
        Category: 'Picture and Location',
        clue: [
            {
                text: 'Hey, yo',
                photos: ""
            }
        ],
        answer_Type: 'Picture and Location',
        answer: ['orange', 'apple', 'mango'],
        Other_Info: 'I am orange'
    },
    hint: [
        {
            Content: 'I am the hint 1',
            MaxPoints: 123
        },
        {
            Content: 'I am the hint 2',
            MaxPoints: 456
        }
    ]
}

function MissionDetail(props) {
    const classes = useStyles();
    const [data, setData] = useState(dummyData);
    const { history } = props;
    useEffect(() => {
        const fetchData = async () => {
            const result = await client.get(`api/mission/${props.match.params.id}`);
            console.log(result.data);
            setData(result.data);
        }
        fetchData();
    }, [props.match.params.id]);
    const combineHints = (hints) => {
        const hintsArray = hints.map(hint => {
            if (hint === null) {
                return 'No hint';
            }
            return `${hint.Content}: ${hint.MaxPoints}`;
        })
        return hintsArray.join(',')
    }
    return (
        <div>
            <div style={{
                position: 'absolute',
                left: '28%',
                top: '20%',
                cursor: 'pointer',
            }} onClick={() => history.push('/admin')}>
                <ArrowBackIcon fontSize="large" color="info" />
            </div>
            <div style={{
                position: 'absolute',
                left: '55%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                marginTop: '40px',
                width: '600px',
                height: '500px',
                overflow: 'auto',
            }}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                }}>
                </div>
                <div className={classes.root}>
                    <div className={classes.demo}>
                        {data.mission.Location && <MissionListItem title='Location: ' value={`Lat: ${data.mission.Location.Lat}, Long: ${data.mission.Location.Long}`} />}
                        <MissionListItem title='Category: ' value={data.mission.Category} />
                        <MissionListItem title='Mission Name: ' value={data.mission.MissionName} />
                        <MissionListItem title='Clue/Mission: ' value={data.mission.clue} eval={true} />
                        <MissionListItem title='Answer Type: ' value={data.mission['answer_Type']} />
                        {data.mission.ServerEvaluation ? <MissionListItem title='Server Evaluation: ' value={'True'} /> : <MissionListItem title='Server Evaluation: ' value={'False'} />}
                        <MissionListItem title='Answer: ' value={data.mission.answer.join(',')} />
                        <div style={{ paddingRight: '10px' }}>
                            <MissionListItem title='Hints: ' value={combineHints(data.hint)} />
                        </div>
                        <MissionListItem title='Other information: ' value={data.mission['Other_Info']} />
                        <MissionListItem title='Maximum Points: ' value={data.mission.maxPoints} />
                        {data.mission.isBonus && <MissionListItem title='Type of clue: ' value={'Bonus'} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MissionDetail;