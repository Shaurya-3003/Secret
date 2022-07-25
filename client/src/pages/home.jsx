import React, {useState} from "react";
import axios from "axios";
import MyButton from "../components/button";


export default function Home() {
    const [data, setData] = useState("Hello World");
    const checkConnection = async () => {
        const base='http://127.0.0.1:5000';
        const fetchedData = await axios.get(base);
        if (fetchedData.status !== 200) setData("Connection failed. Try again later.");
        else {
            const displayedData = fetchedData.data.message;
            setData(displayedData);
        }
    }
    return (
        <div>
            <button onClick={checkConnection}>Click Me to check connection</button>
            <p>{data}</p>
            <MyButton route="/login" title="Log In" />
            <MyButton route="/signup" title="Sign Up" />
        </div>
    )

}

