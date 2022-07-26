import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import { User } from "../mongodb.js";
import data from "../data.js";
import cookieParser from "cookie-parser";
import posts from "../posts.js";

const login = express.Router();
login.use(bodyParser.urlencoded({ extended: true }));
login.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));

login.use(cookieParser(process.env.SECRET));

login.use(passport.initialize());
login.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => {
        done(err, doc);
    })
});



login.route('/')
    .get((req, res) => {
        console.log(req.isAuthenticated());
        if(req.isAuthenticated()){
            const obj = {
                'user': req.user,
                'posts': posts
            }
            res.send(JSON.stringify(obj));
        }
        else res.status(401).json({'error': 'Request is unAuthenticated'});
    })
    .post((req, res, next) => {
        passport.authenticate("local", { failureRedirect: '/login' }, (err, user) => {
            if (err) res.status(401).json({ 'error': 'unauthorized' });
            else {
                req.logIn(user, (err) => {
                    if (err) res.status(401).json({ 'error': 'unauthorized' });
                    else {
                        const obj = {
                            'user': req.user,
                            'posts': posts
                        }
                        res.send(JSON.stringify(obj));
                    }
                })
            }
        })(req, res, next);
    })

export default login;