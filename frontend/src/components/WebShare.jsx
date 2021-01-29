import React from 'react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon  } from 'react-share';
import { Facebook, Twitter } from '@material-ui/icons'
function WebShare(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '25%' }}>
            <FacebookShareButton
                url="https://source.unsplash.com/random"
                children={<FacebookIcon borderRadius="50%" />}
                quote="sample web share"
                hashtag="#happyhuntchallenge"
            />
            <TwitterShareButton
                url="https://source.unsplash.com/random"
                children={<TwitterIcon borderRadius="50%" />}
                title="sample web share"
                hashtags={["happyhuntchallenge","eventspeciale"]}
            />
        </div>
    );
}

export default WebShare;