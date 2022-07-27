import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import { User, Post } from "../mongodb.js";
import cookieParser from "cookie-parser";

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
    .get(async (req, res) => {
        if(req.isAuthenticated()){
            const allPosts=await Post.find();
            const obj = {
                'user': req.user,
                'posts': allPosts
            }
            res.send(JSON.stringify(obj));
        }
        else res.status(401).json({'error': 'Request is unAuthenticated'});
    })
    .post((req, res, next) => {
        
        passport.authenticate("local", { failureRedirect: '/login' }, async (err, user) => {
            if (err) res.status(401).json({ 'error': 'unauthorized' });
            else {
                const allPosts=await Post.find();
                req.logIn(user, (err) => {
                    if (err) res.status(401).json({ 'error': 'unauthorized' });
                    else {
                        const obj = {
                            'user': req.user,
                            'posts': allPosts
                        }
                        res.send(JSON.stringify(obj));
                    }
                })
            }
        })(req, res, next);
    });

export default login;