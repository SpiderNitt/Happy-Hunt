import { Container } from '@material-ui/core';
import React from 'react';

function RulesAndRegulations(props) {
    return (
        <Container style={{ wordWrap: 'break-word' }}>
            <b>RULES, REGULATIONS & GUIDELINES</b>
            <b>GUIDELINES FOR THE HUNT</b>
            <div style={{ wordWrap: 'break-word' }}>
            1.	Participants must register in teams of 4 or 6 players for the event. <br/>
            2.	The event is four (4) hours long, from start to finish. Any activities done or answers submitted after the event has ended will automatically not be counted or considered.<br/>
            3.	The goal of the hunt is to collect the most points. Prizes will be given to the teams with the most points.<br/>
            4.	The hunt is divided into 3 sets of clues and missions based on the starting location of the teams. Each set will have 3 clues in it. <br/>
            5.	Each clue has a certain number of points that can be earned by cracking the clue or completing a mission. These points will be specified in the application.<br/>
            6.	Each clue may have two parts -<br/>
            o	PART A: These clues require locations (GPS coordinates) as their answer. You have to get within 100 meters of the location for the answer to be recorded. <br/>
            o	PART B: These are simple activities that can mostly be performed within the safety of your vehicle at the location hinted at by Part A.<br/>
            7.	Every clue has a Part A but not necessarily a part B.<br/>
            8.	After every 30-minutes, the next set of 3 clues is unlocked and made available to the teams. The previous sets do not disappear. They are still available for the teams to solve and complete for points.<br/>
            9.	Bonus clues pop at regular intervals. They can be performed anywhere and are not location-specific. They can be completed to earn some more points. <br/>
            10.	The clues also have hints that can help solve them. The use of a hint reduces the number of points scored from that clue.<br/>
            </div>
            <br/>
            <b>RULES & REGULATIONS</b>
            <br/>
            <div>
            1.	Please practice and keep COVID-related health and safety guidelines in mind at all times during the event.<br/>
            2.	Please keep your mask on at all times and a sanitiser or disinfectant close at hand throughout the duration of the event.<br/>
            3.	Please register for the event with a valid email- id and phone number, sharing the requisite information for all the team members.<br/>
            4.	Participants must ensure that they do not step out of their vehicles unless absolutely necessary or required.<br/>
            5.	Please ensure that no traffic rules and trespassing laws are broken and that there is no speeding during the activities in the event. <br/>
            6.	The event is facilitated through the use of a web- application that either one member of a team or all the members must have downloaded onto their mobile devices for the duration of the event.<br/>
            7.	Participants must have their device location and navigation facilities switched on during the event. Allow permissions for the application to record and check for the device location as well as for it to access the camera for the activities in the event.<br/>
            8.	Please keep a portable charger on- hand during the event in case the batteries of your device drain out. <br/>
            </div>
        </Container>
    );
}

export default RulesAndRegulations;