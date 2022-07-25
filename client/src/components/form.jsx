import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Form(props) {
    const [Details, setDetails] = useState({ username: "", password: "" });
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const base='http://127.0.0.1:5000';
        const url = `${base}/${props.route}`;
        try {
            await axios.post(url, Details);
            return navigate("/secrets");
        } catch (error) {
            navigate(`/${props.route}`);
        }
    }

    const fillDetails = () => {
        setDetails({ username: "abc@d.com", password: "comding" });
    }

    return (

        <div>
            <h1> This is the {props.text} page!!</h1>
            <form method="POST" onSubmit={handleSubmit}>
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
            <button onClick={fillDetails} id="automation">
                Fill Details
            </button>
        </div>
    );
}