import React, { useState } from "react";
import axios from "axios";

export default function Form(props) {

    const server = "http://127.0.0.1:5000";
    const url = `${server}/${props.route}`;
    const [Details, setDetails] = useState({ username: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url=`${server}/${props.route}`;
        console.log(url, Details);
        const response=await axios.post(url, Details);
        console.log(response);
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const url = `${server}/${props.route}`;
    //     console.log(url, Details);
    //     const response=await fetch(url, {
    //         method:'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body:JSON.stringify(Details)
    //     });
    //     console.log(response);
    // }





    const fillDetails = () => {
        setDetails({ username: "abc@d.com", password: "comding" });
    }

    return (

        <div>
            <h1> This is the {props.text} page!!</h1>
            <form method="POST" action={url} onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="username"
                    placeholder="Enter e-mail"
                    value={Details.username}
                    onChange={(e) => setDetails({ ...Details, username: e.target.value })}
                    id="email">
                </input>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={Details.password}
                    onChange={(e) => setDetails({ ...Details, password: e.target.value })}
                    id="password">
                </input>
                <button
                    type="submit">
                    {props.text}
                </button>
            </form>
            <button onClick={fillDetails}>
                Fill Details
            </button>
        </div>
    );
}