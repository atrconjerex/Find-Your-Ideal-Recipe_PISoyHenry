import React from "react";
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import video from '../../assets/videos/Chino11700.mp4'

export default function LandingPage() {
    return (
      <React.Fragment>
          <div className={style.backg}>
              <video loop autoPlay muted className={style.video}>
                <source src={video} type="video/mp4"></source>
              </video>
              <div className={style.capa}/>
              <h1 className={style.title}>Find your ideal recipe</h1>
              <Link to='/home'>
                  <button className={style.button}> GO! </button>
              </Link>
          </div>
      </React.Fragment>
    )
}