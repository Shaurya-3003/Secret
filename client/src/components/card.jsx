// This will show every secret
// each card will have data.posts{title, body, likes, shares, posted};
import React from "react";
import {format} from "timeago.js"

export default function Card(props){

    const date=new Date(props.time);
    const timeago=format(date)

    return(
        <div className="card">
            <h3> {props.title}</h3>
            <p>{props.body}</p>
            <p>Likes: {props.likes}</p>
            <p>
            {props.toggleLike && <button onClick={()=>props.toggleLike(props.id)}>Like</button>}
            <button onClick={()=>props.toggleShare(props.id)}>Share</button>
            </p>
            <p>Posted: {timeago}</p>
            {props.delete && <button onClick={()=>props.handleDelete(props.id)}>{props.delete}</button>}
        </div>
    ) 
}