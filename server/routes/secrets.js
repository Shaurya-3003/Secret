import express from "express";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";
import { User } from "../mongodb.js";
import posts from "../posts.js";

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
passport.serializeUser( (user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done)=> {
    done(null, user);
});

secrets.get('/', (req, res)=>{
    if(req.isAuthenticated) res.status(200).send(posts);
    else res.status(401).redirect('/login');
});

export default secrets;