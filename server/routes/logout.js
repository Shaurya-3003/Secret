import express from 'express';
import home from './home';

const logout=express.Router();

logout.get((req, res)=>{
    req.logout();
    res.redirect(home);
})