import express from "express";
import cors from "cors";
import 'dotenv/config';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import home from "./routes/home.js";
import login from "./routes/login.js";
import signup from "./routes/signup.js";
import secrets from "./routes/secrets.js";
import compose from "./routes/compose.js";
import logout from "./routes/logout.js";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})

app.use('/', home);
app.use('/signup', signup);
app.use('/login', login);
app.use('/secrets', secrets);
app.use('/compose', compose);
app.use('/logout', logout);

try {
    mongoose.connect("mongodb://localhost:27017/secretsDB");
} catch (e) {
    res.send(e);
}




