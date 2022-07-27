import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import base64 from "base-64";
import axios from "axios";
import Card from "../components/card";

export default function SharedSecret(props){

    const {postid}=useParams();
    const [cardData, setCardData]=useState({});

    const realId=base64.decode(postid);
    console.log(realId);

    const toggleShare=()=>{

    }

    useEffect(()=>{
        const post=async()=>{
            const res=await axios(`http://127.0.0.1:5000/posts/${realId}`)
            if(res.status===200){
                setCardData(res.data);
                console.log(cardData);
            }
        };
        post();
    }, []);

    return(
        <div>
            <p>Shared Secret is here</p>
            <Card
                key={1}
                title={cardData.title}
                body={cardData.body}
                likes={cardData.likes}
                toggleShare={toggleShare}
                time={cardData.posted}
            />
        </div>
    )
}