import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'
export const GET_DIETS = 'GET_DIETS'
export const GET_FILTER_BY_TYPE = 'GET_FILTER_BY_TYPE'
export const GET_FILTER_BY_SCORE = 'GET_FILTER_BY_SCORE'
export const GET_FILTER_BY_NAME = 'GET_FILTER_BY_NAME'
export const GET_NAME_RECIPES = 'GET_NAME_RECIPES'
export const GET_DETAIL = 'GET_DETAIL'
export const CLEAN = 'CLEAN'

export function getRecipes() {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/recipes')
            return dispatch({
               type: GET_RECIPES,
               payload: json.data
            })
        } catch(error) {
            alert('Opss.. It seems that we are not cooking anything now, please try it later');
            return error;
        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/diets')
            return dispatch({
              type: GET_DIETS,
              payload: json.data
            })
        } catch(error) {
            alert('Opss.. diets were not found');
            return error;
        } 
    }
}

export function filterByType(payload) {
    return {
        type: GET_FILTER_BY_TYPE,
        payload
    }
}

export function filterByName(payload) {
    return {
        type: GET_FILTER_BY_NAME,
        payload
    }
}

export function filterByScore(payload) {
    return {
        type: GET_FILTER_BY_SCORE,
        payload
    }
}

export function getNameRecipes(name) { //via query obtengo nombre de receta
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            if(!name) {
                alert('The results do not match with the requested name')
                return "The results do not match with the requested name"
            }
            return dispatch({
                type: GET_NAME_RECIPES,
                payload: json.data
            })
        } catch (error) {
            alert('The results do not match with the requested name')
            return error
        }
    }
}


export function getRecipeDetail(id) { // arreglar?
    return async function (dispatch) {
        const response = await axios
        .get(`http://localhost:3001/recipes/${id}`)
        .then((res) => dispatch({ type: GET_DETAIL, payload: res.data }))
        .catch((error) => {
          alert('The request recipe not exist, please return to home page')
          return error;
        })
        return response; 
    }
}


export function postRecipe(payload) {
    return async function () {
        var data = await axios
        .post('http://localhost:3001/recipe', payload)
        .catch((error) => {
            alert(data.msg)
            return error;
        }) 
        return data;
    }
}

export function clean() {
    return async function (dispatch) {
        return dispatch({
            type: CLEAN
        })
     
    }
}
