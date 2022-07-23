import React from "react";

export default function Form(props){

    return (
        <div>
            <form method="POST" action={`http://127.0.0.1:5000/${props.route}`}>
                <input type="email" name="username" placeholder="Enter e-mail"></input>
                <input type="password" name="password" placeholder="Enter password"></input>
                <button type="submit"> {props.text} </button>
            </form>    
        </div>
    );
}