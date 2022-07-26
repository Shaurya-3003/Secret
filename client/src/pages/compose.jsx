import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import "./app.modules.css";

export default function Compose(){
    const [data, setData]=useContext(UserContext);
    const navigate=useNavigate();
    const [post, setPost]=useState({
        title:'',
        body:''
    });
    useEffect(()=>{
        console.log("use effect called on compose page");
        const fetch=async()=>{
            if(data.user===null){
                console.log("Getting Authentication");
                const res=await axios.get('http://127.0.0.1:5000/login', {withCredentials: true});
                console.log(res);
                if(res.status===200){
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

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await axios.post(`http://127.0.0.1:5000/compose/${data.user._id}`, post, {
            withCredentials: true
        })
        if(res.status===200){
            alert("Your secret was successfully posted.")
            navigate('/secrets');
        } 
        else alert("There seems to be an error here.");
    }

    return(
        <div>
            {data.user && <p> Compose Page of {data.user.username}</p>}
            {!data.user && <p> Compose Page if can't get user</p>}
            <form method="POST" onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Title... "
                value={post.title}
                onChange={(e)=> setPost({...post, title: e.target.value})}>
                </input>
                <textarea
                rows={5}
                cols={20}
                value={post.body}
                onChange={(e)=>setPost({...post, body: e.target.value})}
                placeholder='Write Secret here...'>    
                </textarea>
                <button type="submit" className="btn compose"> Submit </button>
            </form>
        </div>
    )
}