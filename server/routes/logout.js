import express from 'express';
import session from 'express-session';
import passport from 'passport';

const logout=express.Router();

logout.route('/').
get((req, res)=>{
    req.logout;
    res.redirect('/');
})

export default logout;