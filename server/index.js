import express from "express";
import cors from "cors";
import 'dotenv/config';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import home from "./routes/home.js";
import login from "./routes/login.js";
import signup from "./routes/signup.js";
import compose from "./routes/compose.js";
import logout from "./routes/logout.js";
import posts from "./routes/posts.js"
import session from "express-session";




const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true
}));
app.use(cookieParser(process.env.SECRET));


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})

app.use('/', home);
app.use('/signup', signup);
app.use('/login', login);
// app.use('/secrets', secrets);
app.use('/compose', compose);
app.use('/logout', logout);
app.use('/posts', posts)

try {
    mongoose.connect("mongodb://localhost:27017/secretsDB");
} catch (e) {
    res.send(e);
}




