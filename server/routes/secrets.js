import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local"
import session from "express-session";
import bodyParser from "body-parser";
import { User } from "../mongodb.js";
import posts from "../posts.js";
import cors from "cors";
import data from "../data.js";

const secrets = express.Router();
secrets.use(bodyParser.urlencoded({ extended: true }));
secrets.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
secrets.use(passport.initialize());
secrets.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => {
        done(null, doc);
    })
});


secrets.get('/', (req, res) => {
    if (req.isAuthenticated) res.send(posts);
    else res.status(401).send(json({'error': 'unauthorized'}));
});

export default secrets;