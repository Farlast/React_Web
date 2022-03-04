import React from 'react';

export default function SError(props) {
    //console.log(props);
    //const language = localStorage.getItem("language");
    return (
        <>
            <span className={typeof props.error!=='undefined'?'error':""}>{props.error}</span>
        </>
    );
}