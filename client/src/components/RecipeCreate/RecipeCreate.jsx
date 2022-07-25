import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./RecipeCreate.module.css";


function validate(input) {
    let errors = {};
    if (!input.name || /[@!#$%&/0-9]/g.test(input.name)) {
        errors.name = "A valid name is required (must not have symbols or numbers)";
    } else if (!input.dish_summary) {
        errors.dish_summary = "Dish Summary is required";
    } else if (!input.image) {
        errors.image = "The link image of recipe is required";
    } else if (input.score > 100 || input.score <= 0) {
        errors.score = "The score has to be lower than 100";
    } else if (input.healthScore > 100  || input.healthScore <= 0) {
        errors.healthScore = "The healt has to be lower than 100";
    } else if (!input.instructions) {
        errors.instructions = "The Steps Instructions are required";
    } else if (input.diets.length === 0) {
        errors.diets = "Select one type of diet at least";
    }
    return errors;
}

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
    const [errors, setError] = useState({})

    const [input, setInput] = useState({
        name: "",
        dish_summary: "",
        image: "",
        score: 0,
        healthScore: 0,
        instructions: "",
        diets: [],
    })

    useEffect(() => { dispatch(getDiets()) }, [dispatch])


    function handleDelete(e, el) {
        e.preventDefault()
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== el)
        })
        setError(                          
            validate({
                ...input,
                [e.target.name]: e.target.value,  
            }))
    }

    function handleChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(                          
            validate({
                ...input,
                [e.target.name]: e.target.value,  
            })
        );
    }

    function handleSelect(e) {
        e.preventDefault()
        if(!input.diets.includes(e.target.value) && e.target.value !== 'vacio') {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
        e.target.value = 'vacio'
        setError(                          
            validate({
                ...input,
                [e.target.name]: e.target.value,  
            })
        );
    }

    function handleSubmit(e) {  
        if(Object.keys(errors).length === 0) { 
        e.preventDefault()
        dispatch(postRecipe(input))
        alert('Receta creada con éxito')
        setInput({                          
            name: "",
            dish_summary: "",
            image: "",
            score: 0,
            healthScore: 0,
            instructions: "",
            diets: []

        })
        history.push('/home')  
        }
        e.preventDefault()
    }

    return (
        <div className={style.contains}>
            <form className={style.form}
                onSubmit={(e) => handleSubmit(e)}>
            <Link to='/home'><button className={style.button}>BACK</button></Link>
                <div >
                    <h1>CREATE YOUR RECIPE!</h1>
                    <h2>Recipe name:</h2>
                    <input className={style.input}
                        type="text"
                        value={input.name}
                        required
                        name="name"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && <p className={style.err}> {errors.name}</p>}

                </div>
                <div>
                    <h2>Dish Summary:</h2>
                    <textarea className={style.summary}
                        type="text"
                        value={input.dish_summary}
                        required
                        name="dish_summary"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.dish_summary && <p className={style.err}> {errors.dish_summary}</p>}</div>
                <div>
                    <div>
                        <h2>Optional Image: </h2>
                        <input className={style.input}
                            type="text"
                            value={input.image}
                            required
                            name="image"
                            placeholder="URL image"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <h2>Score:</h2>
                    <input className={style.input}
                        type="number"
                        required
                        name="score"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.score && <p className={style.err}> {errors.score}</p>}

                </div>
                <div>
                    <h2>Health Score:</h2>
                    <input className={style.input}
                        type="number"
                        required
                        name="healthScore"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.healthScore && <p className={style.err}> {errors.healthScore}</p>}

                </div>
                <div>
                    <h2>Steps:</h2>
                    <textarea className={style.steps}
                        type="textarea"
                        value={input.steps}
                        required
                        name="instructions"
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.instructions && <p className={style.err}> {errors.instructions}</p>}
                </div>
                    <h2>Select diets:</h2>
                <select className={style.diets}
                onChange={(e) => handleSelect(e)}>
                    <option hidden selected value='vacio'>Diets..</option>
                    {diets?.map((d, index) => (
                        <option key={index} value={d.name}>{d.name}</option>
                        ))}
                </select>
                {errors.diets && <p className={style.err}> {errors.diets}</p>}
                <h3>{input.diets.map(el => el.toUpperCase() + ", ")}</h3> 
                <div className={style.inputDiets}>
                {input.diets.map((el, index) =>
                    <div key={'typeDiet'+ index} className={style.subcontains}>
                    <button className={style.buttonDelete}
                    onClick={(e) => handleDelete(e, el)}>X</button>
                    <h3>{el}</h3>
                    </div>
                    )}
                </div>
                <button className={style.buttonCreate} type="submit">Create your recipe</button>
            </form>

        </div>
    )
}