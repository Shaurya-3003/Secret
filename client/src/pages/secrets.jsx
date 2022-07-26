// jshint:esversion6

import axios from "axios";
import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

export default function SecretPage(props) {
    const url = 'http://127.0.0.1:5000'
    const navigate = useNavigate();
    const [data, setData]=useContext(UserContext);

    useEffect(() => {
        if(data.user===null){
            navigate('/login');
        }
    });

    const handleLogout = async () => {
        await axios.get(`${url}/logout`, {
            withCredentials: true
        })
        navigate('/');
    }
    return (
        <div>
            <p> Reached Secrets Page of {data.user.username}</p>
            {
                data.posts.map((post, index) => {
                    return <p key={index}>{post.body}</p>
                })
            }
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

