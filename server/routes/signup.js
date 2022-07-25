import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import passsportLocalMongoose from "passport-local-mongoose";
import bodyParser from "body-parser";
import { User } from "../mongodb.js";
import data from "../data.js";

const signup = express.Router();
signup.use(bodyParser.urlencoded({ extended: true }));
signup.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
signup.use(passport.initialize());
signup.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, (err, doc)=>{
        done(null, doc);
    })
});

signup.route('/')
    .get((req, res) => res.send(data.signupPage))
    .post((req, res) => {
        const {username, password}=req.body;
        User.register({ username }, password, (err, user) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
            else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/secrets");
                })
            }
        })
    })

export default signup;