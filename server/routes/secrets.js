import express from "express";
import data from "../data.js";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";
import { User } from "../mongodb.js";


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
    if(req.isAuthenticated) res.status(200).send(data.secretsPage);
    else res.status(400).send(data.authError);
});

export default secrets;