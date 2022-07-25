import React from 'react';
import style from './Card.module.css'

export default function Card({ name, diets, image }) {
    return (
        <div className={style.card}>
            <h3>{name}</h3>
            {diets.map((e, index) => <h5 key={index} className={style.diet}>{e.name}</h5>)}
            <img className={style.image} src={image ? image :'https://th.bing.com/th/id/R.bd90c39e1235f68b88affffa2bf55fe4?rik=38DZcpZjUEDV5w&pid=ImgRaw&r=0'} alt='Img not found'/>
        </div>
    )
}