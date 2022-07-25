import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import { User } from "../mongodb.js";
import data from "../data.js";

const login = express.Router();
login.use(bodyParser.urlencoded({ extended: false }));
login.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

login.use(passport.initialize());
login.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc)=>{
        done(null, doc);
    })
});



login.route('/')
    .get((req, res) => {
        res.send(data.loginPage);
    })
    .post((req, res) => {
        const {username, password}=req.body;
        const user = new User({
            username,
            password
        });
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                res.send(data.error);
            }
            else {
                passport.authenticate("local", {failureRedirect:'/login'})(req, res, () => {
                    res.redirect("/secrets");
                });
            }
        });
    });

export default login;