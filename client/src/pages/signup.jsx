import React from "react";
import Form from "../components/form";
import InitNav from "../components/navLanding";
import style from "../css-modules/landing.module.css"

export default function LoginForm() {
    return (
        <div className={style.loginpg}>
            <InitNav />
            <div className={style.content}>
                <Form text="Sign Up" route="signup" title="SIGN UP" />
            </div>
        </div>
    )
}