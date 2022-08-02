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
    // } else if (!input.instructions) {
    //     errors.instructions = "The Steps Instructions are required";
    } 
    return errors;
}

function validateminor(input) {
    let minorerrors = {};
    if (input.healthScore > 100  || input.healthScore <= 0) {
        minorerrors.healthScore = "The healt has to be lower than 100";
    } else if (!input.diets) {
        minorerrors.diets = "Select one type of diet at least";
    }    
    return minorerrors;
}

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
    const [errors, setError] = useState({})
    const [minorerrors, setminorError] = useState({})

    const [input, setInput] = useState({
        name: "",
        dish_summary: "",
        healthScore: 0,
        // image: "",
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
        // setError(                          
        //     validate({
        //         ...input,
        //         [e.target.name]: e.target.value,  
        //     })
        // )
        setminorError(
            validateminor({
                ...input,
                [e.target.name]: e.target.value, 
            })
        )
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
        )
        setminorError(
            validateminor({
                ...input,
                [e.target.name]: e.target.value, 
            })
        )
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
        // setError(                          
        //     validate({
        //         ...input,
        //         [e.target.name]: e.target.value,  
        //     })
        // );
        setminorError(
            validateminor({
                ...input,
                [e.target.name]: e.target.value, 
            })
        )
    }

    function handleSubmit(e) {  
        if(Object.keys(errors).length === 0) { 
          e.preventDefault()
          dispatch(postRecipe(input))
          alert('Successfully created recipe!')
          setInput({                          
            name: "",
            dish_summary: "",
            healthScore: 0,
            // image: "",
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
                <div>
                    <h1 id={style.title}>CREATE YOUR RECIPE</h1>
                    <h2>* Recipe name:</h2>
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
                    <h2>* Dish Summary:</h2>
                    <textarea className={style.summary}
                        type="text"
                        value={input.dish_summary}
                        required
                        name="dish_summary"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.dish_summary && <p className={style.err}> {errors.dish_summary}</p>}
                </div>
                <div>
                    <h2>Health Score:</h2>
                    <input className={style.smallinput}
                        type="number"
                        name="healthScore"
                        onChange={(e) => handleChange(e)}
                    />
                    {minorerrors.healthScore && <p className={style.err}> {minorerrors.healthScore}</p>}
                </div>
                {/* <div>
                    <h2>Optional Image: </h2>
                    <input className={style.input}
                        type="text"
                        value={input.image}
                        name="image"
                        placeholder="URL image"
                        onChange={(e) => handleChange(e)}
                    />
                </div> */}
                <div>
                    <h2>Steps:</h2>
                    <textarea className={style.steps}
                        type="textarea"
                        value={input.steps}
                        name="instructions"
                        onChange={(e) => handleChange(e)}
                    />
                    {/* {errors.instructions && <p className={style.err}> {errors.instructions}</p>} */}
                </div>
                <h2>Select diets:</h2>
                <select className={style.diets}
                    onChange={(e) => handleSelect(e)}>
                    <option hidden selected value='vacio'>Diets...</option>
                    {diets?.map((d, index) => (
                       <option key={index} value={d.name}>{d.name}</option>
                    ))}
                </select>
                {minorerrors.diets && <p className={style.err}> {minorerrors.diets}</p>}
                <div className={style.inputDiets}>
                    {input.diets.map((el, index) =>
                      <div key={'typeDiet'+ index} className={style.showdiets}>
                          <button  className={style.buttonDelete}  onClick={(e) => handleDelete(e, el)}>X</button>
                          <h3>{el}</h3>
                      </div>
                    )}
                </div>
                <button className={style.buttonCreate} type="submit">Create your recipe</button>
            </form>
        </div>
    )
}