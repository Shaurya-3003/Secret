import express from "express";
import data from "../data.js";
import { User } from "../mongodb.js";
import bodyParser from "body-parser";

const home = express.Router();

home.route('/').
    get((req, res) => {
        res.send(data);
    }).
    post((req, res) => {
        const userName = req.body.name;
        const password = req.body.password;
        const gAuth = false;
        const email = req.body.email;
        const user = new User({
            gAuth,
            userName,
            email,
            password,
            posts: [],
            likedPosts: []
        });
        user.save();
        res.send(data.userAdded);
    });

export default home;