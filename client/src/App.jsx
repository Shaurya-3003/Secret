// jshint: esversion6
import React, {useState} from 'react';
import axios from 'axios';

export default function App() {
    const server='http://127.0.0.1:5000';
    const [data, setData] = useState("Hello World");
    const checkConnection=async()=>{
        const fetchedData=await axios.get(server);
        if(fetchedData.status!==200) setData("Connection failed. Try again later.");
        else{
            const displayedData=fetchedData.data.message;
            setData(displayedData);
        }
    }

    return (
        <div>
            <button onClick={checkConnection}>Click Me</button>
            <p>{data}</p>
        </div>
    );
}