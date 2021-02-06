import React , { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import client from '../api/client';

function Hints(props) {
    const [showSecondHint, setshowSecondHint] = useState(false);
    const [disable1, setDisable1] = useState(false);
    const [data, setData]= useState([]);
    const [hints, setHints] = useState(props.data);

    const getHints=() => {
        const body= {
            "MissionId":props.id,
        }
        const fetch = async () => {
          const result = await client.post('api/player/hint', body)
          console.log(result);
          setData(result.data);
      }
      fetch();
      }

      useEffect(()=>{
          getHints();
      },[])
    
    console.log(props)
    console.log(data)

    const onButtonClickHandler = () => {
        hints.length > 1 && setshowSecondHint(true);
        setDisable1(true);
        getHints();
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
            <Button variant="contained" onClick={onButtonClickHandler} disabled={disable1} color="primary" style={{margin:5}}>
                 View second hint
            </Button>
           </>}
        </div>
    );
}

export default Hints;