// jshint: esversion6
import React from 'react';
import Form from './components/form';
import Home from './pages/home';
import SecretPage from './pages/secrets';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Form text="Log In" route="login"/>}></Route>
                <Route path='/signup' element={<Form text="Sign Up" route="signup"/>}></Route>
                <Route path='/secrets' element={<SecretPage/>}></Route>
            </Routes>
        </Router>
    );
}