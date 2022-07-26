// jshint:esversion6

import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

export default function SecretPage() {
    const url = 'http://127.0.0.1:5000'
    const navigate = useNavigate();
    const [data, setData] = useContext(UserContext);

    useEffect(() => {
        const fetch = async () => {
            if (data.user === null) {
                const res = await axios.get('http://127.0.0.1:5000/login', { withCredentials: true });
                console.log("useEffect was called");
                if (res.status === 200) {
                    setData({
                        user: res.data.user,
                        posts: res.data.posts
                    });
                }
                else navigate('/login');
            }
        };
        fetch();
    }, [data.user, navigate, setData]);

    const handleLogout = async () => {
        await axios.get(`${url}/logout`, {
            withCredentials: true
        })
        navigate('/');
    }
    return (
        <div>
            {data.user && <p> Reached Secrets Page of {data.user.username}</p>}
            { data.posts &&
                data.posts.map((post, index) => {
                    return <p key={index}>{post.body}</p>
                })
            }
            <button onClick={() => navigate('/compose')} className="btn">Compose</button>
            <button onClick={handleLogout} className="btn">Log Out</button>
        </div>
    )
}

