// jshint: esversion6
import React, { useMemo, useState } from 'react';
import Home from './pages/home';
import LoginForm from './pages/login';
import SignupPage from './pages/signup';
import SecretPage from './pages/secrets';
import MySecrets from './pages/viewsecrets';
import Compose from './pages/compose';
import SharedSecret from './pages/sharedsecret';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './utils/UserContext';
import LikedSecrets from './pages/likedSecrets';



export default function App() {

    const [data, setData] = useState({
        'user':null,
        'posts':null
    });

    const value = useMemo(() => ( [data, setData ]), [data, setData]);


    return (
        <Router>
            <UserContext.Provider value={value}>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<LoginForm/>}></Route>
                    <Route path='/signup' element={<SignupPage />}></Route>
                    <Route path='/secrets' element={<SecretPage />} ></Route>
                    <Route path='/compose' element={<Compose />}></Route>
                    <Route path='/viewsecrets' element={<MySecrets/>}></Route>
                    <Route path='/shared/:postid' element={<SharedSecret/>}></Route>
                    <Route path='/liked' element={<LikedSecrets/>}></Route>
                </Routes>
            </UserContext.Provider>
        </Router>
    );
}