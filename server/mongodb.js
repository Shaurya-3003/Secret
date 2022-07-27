import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const postSchema = {
    title: String,
    body: String,
    likes: Number,
    posted: Date
}

const userSchema = new mongoose.Schema({
    gAuth: Boolean,
    username: String,
    profileName: String,
    password: String,
    posts: [postSchema],
    likedPosts: [postSchema]
});

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User", userSchema);
const Post=mongoose.model("Posts", postSchema);


export {User, Post};



