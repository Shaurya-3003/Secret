import express from "express";
import session from "express-session";
import data from "../data.js";
import { User, Post } from "../mongodb.js";
import passport from "passport";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const compose = express.Router();

compose.use(bodyParser.urlencoded({ extended: true }));
compose.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));

compose.use(cookieParser(process.env.SECRET));

compose.use(passport.initialize());
compose.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => {
        done(err, doc);
    })
});


compose.post('/:id', (req, res) => {
    console.log(req.isAuthenticated);
    if (req.isAuthenticated) {
        const id=req.params.id;
        console.log(id, req.user);
        const title = req.body.title;
        const body = req.body.body;
        const likes = 0;
        const shares = 0;
        const posted = new Date();
        const post = new Post({
            title,
            body,
            likes,
            shares,
            posted
        });
        User.updateOne({ _id:id }, { $push: { posts: post } }, (err, user)=>{
            if(err) console.log(err)
            else console.log("Successfully updated user with id", id);
        });
        post.save();
        res.send(data.postAdded)
    }
    else res.status(401).json({'error':'Request is not authenticated'});
});

export default compose;
