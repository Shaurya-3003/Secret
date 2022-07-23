import express from "express";
import data from "../data.js";

const secrets=express.Router();

secrets.get('/', (req, res)=>{
    res.send(data.secretsPage);
});

export default secrets;