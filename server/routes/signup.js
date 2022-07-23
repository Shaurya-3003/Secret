import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import passsportLocalMongoose from "passport-local-mongoose";
import bodyParser from "body-parser";
import { User } from "../mongodb.js";
import data from "../data.js";
import secrets from "./secrets.js";

const signup = express.Router();
signup.use(bodyParser.urlencoded({ extended: true }));
signup.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
signup.use(passport.initialize());
signup.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

signup.route('/')
    .get((req, res)=>res.send(data.signupPage))
    .post((req, res) =>{
        const email = req.body.email;
        const password = req.body.password;
        const user = new User({
            email,
            gAuth: false,
            userName: "",
            posts: [],
            likedPosts: []
        });
        User.register({username: email}, password, (err, user)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                passport.authenticate("local")(req, res, ()=>{
                    res.redirect(secrets);
                })
            }
        })
    })

export default signup;