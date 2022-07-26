// jshint:esversion6

import axios from "axios";
import React, { useContext, useEffect } from "react";
import base64 from "base-64";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import Card from "../components/card";

export default function SecretPage() {
    const url = 'http://127.0.0.1:5000'
    const navigate = useNavigate();
    const [data, setData] = useContext(UserContext);

    const fetch = async () => {
        if (data.user === null) {
            const res = await axios.get('http://127.0.0.1:5000/login', { withCredentials: true });
            if (res.status === 200) {
                setData({
                    user: res.data.user,
                    posts: res.data.posts
                });
            }
            else navigate('/login');
        }
    };

    useEffect(() => {
        fetch();
    });

    const handleLogout = async () => {
        await axios.get(`${url}/logout`, {
            withCredentials: true
        })
        navigate('/');
    }

    const toggleLike = async (postid) => {
        const liked = data.user.likedPosts.find(post => post._id === postid);
        console.log("toggleLike called");
        if (liked) {
            const res = await axios.patch(
                `${url}/posts`, {
                method: 'unlike',
                postid
            },
                {
                    withCredentials: true
                });
            if (res.status === 200) {
                navigate(0);
            }
            else {
                alert("Something went wrong");
            }
        }
        else {
            const res = await axios.patch(
                `${url}/posts`, {
                method: 'like',
                postid
            },
                {
                    withCredentials: true
                });
            if (res.status === 200) {
                navigate(0);
            }
            else {
                alert("Something went wrong");
            }
        }
    }

    const toggleShare = (id) => {
        const postid=base64.encode(id);
        const shareLink=`http://127.0.0.1:3000/shared/${postid}`;
        navigator.clipboard.writeText(shareLink);
    }

    return (
        <div>
            {data.user && <p> Reached Secrets Page of {data.user.username}</p>}
            {data.posts &&
                data.posts.map((post, index) => {
                    return <Card
                        key={index}
                        id={post._id}
                        title={post.title}
                        body={post.body}
                        likes={post.likes}
                        shares={post.shares}
                        time={post.posted}
                        toggleLike={toggleLike}
                        toggleShare={toggleShare} />
                })
            }
            <button onClick={() => navigate('/compose')} className="btn">Compose</button>
            <button onClick={handleLogout} className="btn">Log Out</button>
            <button onClick={() => navigate('/viewsecrets')} className="btn"> View your Secrets</button>
            <button onClick={()=> navigate('/liked')} className="btn"> View liked Secrets</button>
        </div>
    )
}

