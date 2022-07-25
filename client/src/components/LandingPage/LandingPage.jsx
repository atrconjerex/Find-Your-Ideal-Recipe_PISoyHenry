import React from "react";
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandingPage() {
        return (
            <div className={style.back}>
                <h1 className={style.title}> Find Ideal Recipe's for You</h1>
                <Link to='/home'>
                    <button className={style.button}> GO! </button>
                </Link>
            </div>
        )
}