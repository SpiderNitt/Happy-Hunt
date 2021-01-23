import React from 'react';

function Rules(props) {
    return (
        <div style={{maxWidth:window.innerWidth*0.7, maxHeight:window.innerHeight*0.7, overflowY:"scroll",scrollBehavior:"smooth"}}>
            <h1>
                Instrutions
            </h1>
            <ul>
                1. Each team or individual will be given a sheet with a list of items. You must find all items and snap a photo.
                Once the timer ends, whoever has the most pictures wins. 
            </ul>
            <ul>
                2. If participating as a team, you must always stay together. One cannot wander off and try and find items on their own. 
            </ul>
            <ul>
                3. Do not enter private property. If to need ask a neighbor for an item or permission to take picture, do so.
            </ul>
            <ul>
                4. Play fair, remember its all in good fun and there is no need to ruin someone's good time.
            </ul>
            <ul>
                5. All items must be photograph on one phone or camera. It's much easier to keep track that way.
            </ul>
            <ul>
                6. Make sure you set parameters within the search to avoid anyone getting lost.
            </ul>
            <ul>
                7. It is best to set a reasonable time limit, an hour is enough to 
            </ul>
            <ul>
                8. Do not take a photo of two items together. They must be in seperate pictures.
            </ul>
            <ul>
                9. If you're setting point values to each item, make sure you are specific.
            </ul>
            <ul>
                10. Check for any found items in order to keep track. At the end of the challenge, your team will be asked to show a picture for eact item checked off.
            </ul>

        </div>
    );
}

export default Rules;