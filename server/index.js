import express from "express";
import data from "./data.js";
import cors from "cors";
import 'dotenv/config';

const app=express();
app.use(cors());

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})

app.get('/', (req, res)=>{
    res.send(data);
})
