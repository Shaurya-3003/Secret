import mongoose from "mongoose";

const postSchema = {
    title: String,
    body: String,
    likes: Number,
    shares: Number,
    updated: String,
}

const userSchema = {
    gAuth: Boolean,
    userName: String,
    email: String,
    password: String,
    posts: [postSchema]
}

const User=mongoose.model("User", userSchema);
const Post=mongoose.model("Posts", postSchema);


export {User, Post};



