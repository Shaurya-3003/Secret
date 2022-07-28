import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import { User, Post } from "../mongodb.js";
import cookieParser from "cookie-parser";

const posts = express.Router();
posts.use(bodyParser.urlencoded({ extended: true }));
posts.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));

posts.use(cookieParser(process.env.SECRET));

posts.use(passport.initialize());
posts.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => {
        done(err, doc);
    })
});

posts.route('/delete')
    .post(async (req, res) => {
        if (req.isAuthenticated()) {
            const userid = req.user._id;
            const postid = req.body.postid
            try {
                const deleteMsg = await User.updateOne({ _id: userid }, { $pull: { posts: { _id: postid } } });
                const deletPost = await Post.deleteOne({ _id: postid });
                const deleteLiked = await User.updateMany({ "likedPosts._id": postid }, { $pull: { likedPosts: { _id: postid } } });
                res.status(200).json({ 'deletion': "Successfull" })
            }
            catch (error) {
                console.log(error);
            }
        }
        else res.status(401).json({ "error": "UnAuthorized" });
    }
    );

posts.route('/')
    .patch(async (req, res) => {
        if (req.isAuthenticated()) {
            const { method, postid } = req.body;
            let post, dbRes, personalres;
            console.log(req.user);
            switch (method) { //every post is stored in 4 places->posts, user.posts, user.likedposts, users.likedposts. Update must occur everywhere.  Use reference to post in update
                case "like":
                    console.log("Like method was called");
                    const likeUpdate = await Post.updateOne({ _id: postid }, { $inc: { likes: 1 } }); // Update 1
                    post = await Post.findOne({ _id: postid });
                    dbRes = await User.updateOne({ _id: req.user._id }, { $push: { likedPosts: post } }); // Update 2
                    personalres = await User.updateOne({ 'posts._id': postid }, { $inc: { "posts.$.likes": 1 } }); //Update 3
                    const likedPost= await User.updateMany({'likedPosts._id': postid}, {$inc:{"$likedPosts.$likes": 1}}); // Update 4
                    console.log(likeUpdate, post, dbRes, personalres);
                    res.status(200).json({ 'success': "Post liked successfully" });
                    break;
                case "unlike":
                    console.log("unlike method was called");
                    const unLikeUpdate = await Post.updateOne({ _id: postid }, { $inc: { likes: -1 } });
                    post = await Post.findOne({ _id: postid });
                    dbRes = await User.updateOne({ _id: req.user._id }, { $pull: { likedPosts: { _id: postid } } });
                    personalres = await User.updateOne({ 'posts._id': postid }, { $inc: { "posts.$.likes": -1 } });
                    const unLikedPost= await User.updateMany({'likedPosts._id': postid}, {$inc:{"$likedPosts.$.likes": -1}})
                    console.log(unLikeUpdate, post, dbRes, personalres);
                    res.status(200).json({ 'success': "Post unliked successfully" });
                    break;
                default:
                    res.status(404).json({ 'error': "Page does not exist" });
            }
        }
        else res.status(401).json({ 'error': 'Unauthorized' });
    })

posts.route('/:id')
    .get(async (req, res) => {
        const postid = req.params.id;
        const postData= await Post.findById(postid);
        if(postData){
            res.status(200).json(postData);
        }
        else res.status(404).json({'message': 'Post not found'});
    });

export default posts;
