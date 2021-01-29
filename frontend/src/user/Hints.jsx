import React , { useState, useEffect } from 'react';
import clueData from './ClueData';
import Button from '@material-ui/core/Button';
import Routes from '../utils/routes';
import client from '../api/client';

function Hints(props) {
    const [showSecondHint, setshowSecondHint] = useState(false);
    const [showThirdHint, setshowThirdHint] = useState(false);
    const [disable1, setDisable1] = useState(false);
    const [disable2, setDisable2] = useState(false);
    const [data, setData]= useState([]);
    const [hints, setHints] = useState(props.data);
    // useEffect(() => {
    //     setHints(props.data);
    //     console.log(hints);
    // }, [])

    // const body={
    //     MissionId: `${props.id}`
    // }
    
    // const fetch = async () => {
    //     const result = await client.post('/api/player/hint', body);
    //     console.log(result.data);
    //     setData(result.data);
    // }

    // useEffect(() => {
    // fetch();
    // }, []);

    const onButtonClickHandler1 = () => {
        hints.length > 1 && setshowSecondHint(true);
        setDisable1(true);
    };

    const onButtonClickHandler2 = () => {
        hints.length === 3 && setshowThirdHint(true);
        setDisable2(true);
    };

    return (
        <div>
        {hints !== [] && <>
            <ul>
                {hints[0].Content}
                <span style={{float:"right", fontFamily:"tahoma", fontSize:15, fontStyle:"italic"}}>
                -{hints[0].MaxPoints}
                </span>
            </ul>
            {showSecondHint && 
            <ul>
                {hints[1].Content}
                <span style={{float:"right", fontFamily:"tahoma", fontSize:15, fontStyle:"italic"}}>
                -{hints[1].MaxPoints}
                </span>
            </ul>
            }
            {showThirdHint && 
            <ul>
                {hints[2].Content}

                <span style={{float:"right", fontFamily:"tahoma", fontSize:15, fontStyle:"italic"}}>
                -{hints[2].MaxPoints}
                </span>

            </ul>
            }
        
            {/* <Button variant="contained" color="primary" href={Routes.USER_CLUES} style={{margin:5}}>
                Back
            </Button> */}
            <Button variant="contained" onClick={onButtonClickHandler1} disabled={disable1} color="primary" style={{margin:5}}>
                 View second hint
            </Button>
            {/* {showSecondHint && 
                <Button variant="contained" onClick={onButtonClickHandler2} disabled={disable2} color="primary" style={{margin:5}}>
                    Hint 3
                </Button>
            } */}
           </>}
        </div>
    );
}

export default Hints;