import express from "express";
import cors from "cors";
import 'dotenv/config';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import home from "./routes/home.js";
import compose from "./routes/compose.js";

try {
    mongoose.connect("mongodb://localhost:27017/secretsDB");
} catch (e) {
    res.send(e);
}


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})

app.use('/', home);

app.use('/compose', compose);




