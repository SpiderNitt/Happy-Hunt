import React, { useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon  } from 'react-share';

function WebShare(props) {
    const [image, setImage]= useState("");
    const [video, setVideo]= useState("");
    const data= props.data;
    console.log(data);

    useEffect(()=>{
        if (data.Answer_Type=="Picture"){
            setImage(data.Answer)
        }
        else if (data.Answer_Type=="Video"){
            setVideo(data.Answer)
        }
    })
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <FacebookShareButton
                url={data.Answer}
                children={<FacebookIcon borderRadius="50%" />}
                quote={data.MissionName}
                hashtag="#happyhuntchallenge"
                style={{margin:10}}
            />
            <TwitterShareButton
                url="https://source.unsplash.com/random"
                children={<TwitterIcon borderRadius="50%" />}
                title={data.MissionName}
                hashtags={["happyhuntchallenge","eventspeciale"]}
                style={{margin:10}}
            />
        </div>
    );
}

export default WebShare;