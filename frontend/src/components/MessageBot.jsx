import React from 'react';
import useScript from '../hooks/useScript';

function MessageBot(props) {
    useScript(
        "https://embed.tawk.to/5ffc4538c31c9117cb6d70dc/1eromsq55",
        "user",
        {
          key: "crossorigin",
          value: "*",
        }
    );
    return (
        <div className="user"></div>
    );
}

export default MessageBot;