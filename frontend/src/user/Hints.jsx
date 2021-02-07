import React , { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import client from '../api/client';
import WarningIcon from '@material-ui/icons/Warning';

function Hints(props) {
    const [showSecondHint, setshowSecondHint] = useState(false);
    const [showFirstHint, setshowFirstHint] = useState(false);
    const [disable1, setDisable1] = useState(false);
    const [warning, setWarning] = useState(true);
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
      setshowFirstHint(true);
      setWarning(false)
      }

    // console.log(props)
    // console.log(data)

    const onButtonClickHandler = () => {
        hints.length > 1 && setshowSecondHint(true);
        setDisable1(true);
        getHints();
    };

    return (
        <div>

        {hints !== [] && <>
            {warning &&
                <div>
                <p style={{color:"red", fontFamily:"tahoma"}}><span><WarningIcon style={{ color:"orange", fontSize:20, marginRight: 5}}/></span>Viewing hints will lead to a reduction of points.</p>
                <button onClick={getHints} style={{margin:5, backgroundColor:"#DC143C", color:"white", padding:5, fontFamily:"tahoma", borderRadius:5, fontSize:16}}>
                    Continue
                </button>
            </div>
            }
           
            {showFirstHint && 
             <ul>
                    {hints[0].Content}
                    <div style={{float:"right", fontFamily:"tahoma", fontSize:15, fontStyle:"italic", margin:10}}>
                    -{hints[0].MaxPoints}
                    </div>
                </ul>
            }
           
            {showSecondHint && 
            <ul>
                {hints[1].Content}
                <div style={{float:"right", fontFamily:"tahoma", fontSize:15, fontStyle:"italic",  margin:10}}>
                -{hints[1].MaxPoints}
                </div>
            </ul>
            }
            {showFirstHint && 
                <Button variant="contained" onClick={onButtonClickHandler} disabled={disable1} color="primary" style={{margin:5}}>
                    View second hint
                </Button>
            }
           </>}
        </div>
    );
}

export default Hints;