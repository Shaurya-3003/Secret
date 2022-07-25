import axios from "axios";
import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SecretPage() {
    const url = 'http://127.0.0.1:5000'
    const [secrets, setSecrets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const posts=await axios(`${url}/secrets`);
            setSecrets(posts.data);
        }
        fetch();
    }, []);

    const handleLogout = async () => {
        await axios.get(`${url}/logout`)
        navigate('/');
    }
    return (
        <div>
            <p> Reached Secrets Page</p>
            {
                secrets.map((secret, index) => {
                    return <p key={`${index}`}>{secret.body}</p>
                })
            }
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

