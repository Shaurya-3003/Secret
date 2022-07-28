import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

export default function Form(props) {
    const [Details, setDetails] = useState({ username: "", password: "" });
    const [data, setData] = useContext(UserContext);
    const navigate = useNavigate();

    const base = 'http://127.0.0.1:5000';


    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${base}/${props.route}`;
        try {
            const res = await axios.post(url, Details, {
                withCredentials: true
            });
            setData({
                'user': res.data.user,
                'posts': res.data.posts
            });
            navigate('/secrets');
        } catch (error) {
            console.log(error);
            setDetails({ username: '', password: '' });
            setData(null);
            navigate(`/${props.route}`);
        }
    }

    const fillDetails = () => {
        setDetails({ username: "abc@d.com", password: "comding" });
    }


    return (

        <div>
            <h1> {props.title} </h1>
            <form method="POST" onSubmit={handleSubmit}>
                <p>
                    <input
                        type="email"
                        name="username"
                        placeholder="Enter e-mail"
                        value={Details.username}
                        onChange={(e) => setDetails({ ...Details, username: e.target.value })}
                        id="email">
                    </input>
                </p>
                <p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={Details.password}
                        onChange={(e) => setDetails({ ...Details, password: e.target.value })}
                        id="password">
                    </input>
                </p>
                <p>
                    <button
                        type="submit">
                        {props.text}
                    </button>
                </p>
            </form>
            <button onClick={fillDetails} id="automation">
                Fill Details
            </button>
        </div>
    );
}