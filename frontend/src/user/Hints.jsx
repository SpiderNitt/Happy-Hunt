import React , { useState } from 'react';
import clueData from './ClueData';
import Button from '@material-ui/core/Button';

function Hints(props) {
    const [showSecondHint, setshowSecondHint] = useState(false);
    const [showThirdHint, setshowThirdHint] = useState(false);
    const [disable1, setDisable1] = useState(false);
    const [disable2, setDisable2] = useState(false);

    const onButtonClickHandler1 = () => {
        setshowSecondHint(true)
        setDisable1(true)
    };

    const onButtonClickHandler2 = () => {
        setshowThirdHint(true)
        setDisable2(true)
    };

    return (
        <div >
            <h1>
                {clueData[0].hints[0].name}
            </h1>
            <ul>
                {clueData[0].hints[0].hint}

                <span style={{float:"right", fontFamily:"tahoma", fontSize:15, fontStyle:"italic"}}>
                -{clueData[0].hints[0].pointsReduced}
                </span>

            </ul>
            {showSecondHint && 
                <div>
                     <h1>
                {clueData[0].hints[1].name}
            </h1>
            <ul>
                {clueData[0].hints[1].hint}

                <span style={{float:"right", fontFamily:"tahoma", fontSize:15, fontStyle:"italic"}}>
                -{clueData[0].hints[1].pointsReduced}
                </span>

            </ul>
            </div>
            }
            {showThirdHint && 
                <div>
                     <h1>
                {clueData[0].hints[2].name}
            </h1>
            <ul>
                {clueData[0].hints[2].hint}

                <span style={{float:"right", fontFamily:"tahoma", fontSize:15, fontStyle:"italic"}}>
                -{clueData[0].hints[2].pointsReduced}
                </span>

            </ul>
            </div>
            }
        
            <Button variant="contained" color="primary" href="/clue" style={{margin:5}}>
                Back
            </Button>
            <Button variant="contained" onClick={onButtonClickHandler1} disabled={disable1} color="primary" style={{margin:5}}>
                 Hint 2
            </Button>
            {showSecondHint && 
                <Button variant="contained" onClick={onButtonClickHandler2} disabled={disable2} color="primary" style={{margin:5}}>
                    Hint 3
                </Button>
            }
           
        </div>
    );
}

export default Hints;