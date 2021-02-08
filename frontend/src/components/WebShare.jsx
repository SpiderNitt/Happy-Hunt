import React, { useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon  } from 'react-share';

function WebShare(props) {
    const [image, setImage]= useState("");
    const [video, setVideo]= useState("");
    const [data,setData] = useState(props.data);
    // const data= props.data;
    // console.log(data);

    // const getData = async() => {
    //     await setData(props.data);
    //     if (data.Answer_type==="Picture"){
    //         setImage(data.Answer)
    //     }
    //     else if (data.Answer_type==="Video"){
    //         setVideo(data.Answer)
    //     }
    // }

    // useEffect(()=>{
    //     getData();
    // },[])
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            {data && <>
            <FacebookShareButton
                url={data.Answer}
                children={<FacebookIcon borderRadius="50%" />}
                quote={data.MissionName}
                hashtag="#happyhuntchallenge"
                style={{margin:10}}
            />
            <TwitterShareButton
                url={data.Answer}
                children={<TwitterIcon borderRadius="50%" />}
                title={data.MissionName}
                hashtags={["happyhuntchallenge","eventspeciale"]}
                style={{margin:10}}
            />
            </>}
        </div>
    );
}

export default WebShare;