import React, { useEffect } from "react";
import MyButton from "../components/button";
import InitNav from "../components/navLanding";
import style from "../css-modules/landing.module.css"
import gif from "../images/landing.gif"




export default function Home() {
    useEffect(() => {
        document.title = "Name"
    });
    return (
        <div className={style.homepg}>
            <InitNav />
            <div className={style.content}>
                <h1>
                    INFORMATION FROM HERE ON IS<br />
                    <span className={style.flash}> CLASSIFIED</span>
                </h1>
            </div>
            <div className={style.content}>
                <h3>
                    Name is a safe space to share your secrets. Your identity remains protected <br /> and you can reveal secrets that wouldn't normally.
                </h3>
            </div>
            <div className={style.content}>
                <img alt="Landing GIF" src={gif} />
            </div>
            <div className={`${style.content} ${style.margin}`}>
                <MyButton route="/login" title="Log In" className={style.homebtn} />
                <MyButton route="/signup" title="Sign Up" className={style.homebtn} />
            </div>
        </div>
    )

}

