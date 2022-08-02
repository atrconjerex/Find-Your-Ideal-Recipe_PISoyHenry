import React from "react";
import style from "./Paginate.module.css";

export default function Paginate({ recipesPerPage, allRecipes, paginado, currentPage }) {
    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i ++) {
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className={style.ul}>
                {pageNumbers.map(n => (
                    <li className={style.li} key={n}>
                        <button className={n === currentPage ? style.CPbutton : style.button} onClick={() => paginado(n)}>{n}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}