import express from "express";
import data from "../data.js";
import { User, Post } from "../mongodb.js";
import mongoose from "mongoose";

const compose = express.Router();


compose.post('/:userId', (req, res) => {
    const _id = req.params.userId;
    console.log(_id);
    const title = req.body.title;
    const body = req.body.body;
    const likes = 0;
    const shares = 0;
    const updated = "2s ago";
    const post = new Post({
        title,
        body,
        likes,
        shares,
        updated
    });
    User.findOneAndUpdate({ _id }, { $push: { posts: post } }, null, (err, user)=>{
        if(err) console.log(err);
        else console.log(user);
    });
    post.save();
    res.send(data.postAdded)
});

export default compose;