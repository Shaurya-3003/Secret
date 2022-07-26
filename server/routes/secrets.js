// import express from "express";
// import passport from "passport";
// import session from "express-session";
// import bodyParser from "body-parser";
// import { User } from "../mongodb.js";
// import posts from "../posts.js";
// import data from "../data.js";

// const secrets = express.Router();
// secrets.use(bodyParser.urlencoded({ extended: true }));
// secrets.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
// }));
// secrets.use(passport.initialize());
// secrets.use(passport.session());

// passport.use(User.createStrategy());

// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, doc) => {
//         done(err, doc);
//     })
// });


// secrets.get('/', (req, res) => {
//     console.log("Log 5", req.user);
//     if (req.isAuthenticated()) res.send(posts);
//     else res.send("Redirect back");
// });

// export default secrets;