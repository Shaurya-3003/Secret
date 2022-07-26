import express from "express";
import data from "../data.js";


const home = express.Router();

home.route('/').
    get((req, res) => {
        res.send(data);
    });

export default home;