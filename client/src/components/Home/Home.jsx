import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByType, getRecipes, filterByName, filterByScore, getDiets } from "../../actions/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";
import img1 from "../../assets/images/EMOJIS_498.png";
import img2 from "../../assets/images/EMOJIS_410.png";

export default function Home() {

  const dispatch = useDispatch() 
  const allRecipes = useSelector((state) => state.recipes)
  const diets = useSelector((state) => state.diets)
  const [currentPage, setCurrentPage] = useState(1) 
  const [recipesPerPage, setRecipesPerPage] = useState(9)  
  const iOfLastRecipe = currentPage * recipesPerPage
  const iOfFirstRecipe = iOfLastRecipe - recipesPerPage
  const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe) 
  const [orden, setOrden] = useState('')
  const [orden1, setOrden1] = useState('') 
  
  const paginado = (pageNumber) => {  setCurrentPage(pageNumber) }


  useEffect(() => { dispatch(getRecipes()) }, [dispatch])  
  useEffect(() => { dispatch(getDiets()) }, [dispatch])  

  function handleClick(e) {
    e.preventDefault()
    allRecipes.length = 0
    dispatch(getRecipes())
  }

  function handleDiets(e) {
    e.preventDefault()
    dispatch(filterByType(e.target.value));
    setCurrentPage(1)
  }

  function handleOrderByName(e) {
    e.preventDefault()
    dispatch(filterByName(e.target.value))  
    setCurrentPage(1)
    setOrden1(`Ordenado ${e.target.value}`)
  }

  function handleOrderByScore(e) {
    e.preventDefault()
    dispatch(filterByScore(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  return (
    <div className={style.container}>
      <div className={style.head}>
        <Link className={style.link} to= "/recipe">CREATE RECIPE</Link>
        <div>
          <h1 className={style.title}>Find your ideal recipe</h1>
          <img className={style.img} src={img1} alt="deliciousemoji"/>
          <img className={style.img} src={img2} alt="cutleryemoji"/>
        </div>
      </div>
      <div className={style.bordercont}>
        <SearchBar />
        <select defaultValue='vacio' className={style.select} onChange={(e) => handleOrderByName(e)}>
          <option hidden value='vacio'>Order..</option>
          <option value="asc">A to Z</option>   
          <option value="desc">Z to A</option>
        </select>
        <select defaultValue='vacio' className={style.select} onChange={(e) => handleOrderByScore(e)}>
          <option hidden value='vacio'>healthScore...</option>
          <option value='high'> High score </option>
          <option value='low'> Low score </option>
        </select>
        <select defaultValue='vacio' className={style.select} onChange={(e) => handleDiets(e)}>
              <option hidden value='vacio'>Type...</option>
              {diets?.map((d, index) => (
                <option key={index} value={d.name}>{d.name}</option>
              ))}
        </select>
        <button className={style.button} onClick={e => handleClick(e) }>REMOVE FILTERS</button>
        <div>
          <Paginate 
            key = {1}
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}   
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
        <div className={style.cards}>
          {allRecipes.length > 0 ? currentRecipes.map((el) => { 
            return ( 
              <Link className={style.recipe}
                key = {el.ID}
                to={`recipes/${el.ID}`}>
                <Card key = {el.ID} id={el.ID} name={el.name} diets={el.diets} image={el.image}/>
              </Link>
            ) 
          }) : (<div className={style.loading}> Loading... </div>,
              <img src="https://media.giphy.com/media/A5ugHVbuFL3uo/giphy.gif" />
          )}
        </div>
        <Paginate 
          key = {1}
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}   
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}