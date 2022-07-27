import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import Card from "../components/card";


export default function MySecrets() {

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
        console.log("use effect was called");
        fetch();
    }, []);

    const handleLogout = async () => {
        await axios.get(`${url}/logout`, {
            withCredentials: true
        })
        navigate('/');
    }

    const handleDelete = async (postKey) => {
        const res = await axios.post(`${url}/posts/delete`, { postid: postKey }, {
            withCredentials: true
        });
        if (res.status === 200) {
            alert("Your post has been deleted");
            navigate(-1);
        }
        else {
            alert("There seems to be a problem");
            navigate(0);
        }
    };

    const toggleLike = async (postid) => {
        console.log(data.user.likedPosts);
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
        const postid=Buffer.from(id, 'base64');
        const shareLink=`http://127.0.0.1:3000/shared/${postid}`;
        navigator.clipboard.writeText(shareLink);
        navigate(shareLink);
    }

    return (
        <div>
            {data.user && <p> Reached Personal Secrets Page of {data.user.username}</p>}
            {data.posts &&
                data.user.posts.map((post) => {
                    return <Card
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        body={post.body}
                        likes={post.likes}
                        shares={post.shares}
                        time={post.posted}
                        delete="delete"
                        handleDelete={handleDelete}
                        toggleLike={toggleLike}
                        toggleShare={toggleShare}
                    />
                })
            }
            <button onClick={() => navigate('/compose')} className="btn">Compose</button>
            <button onClick={handleLogout} className="btn">Log Out</button>
        </div>
    )
}