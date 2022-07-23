import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import passsportLocalMongoose from "passport-local-mongoose";
import bodyParser from "body-parser";
import { User } from "../mongodb.js";
import data from "../data.js";
import secrets from "./secrets.js";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


router.route('/')
    .get((req, res) => res.send(data.loginPage))
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = new User({
            email,
            password,
        });
        req.login(user, (err) => {
            if (err) {
                res.send(data.error);
            }
            else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect(secrets);
                });
            }
        })
    })

export default router;