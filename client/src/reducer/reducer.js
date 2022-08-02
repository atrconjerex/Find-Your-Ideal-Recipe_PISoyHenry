import { GET_RECIPES, GET_DIETS, GET_FILTER_BY_TYPE, GET_FILTER_BY_SCORE, GET_FILTER_BY_NAME, GET_NAME_RECIPES, GET_DETAIL} from "../actions/actions";

const initialStae = {
    recipes: [],
    allRecipes: [],
    detail: [],
    diets: []
}

function rootReducer (state = initialStae, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case GET_NAME_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }
        // case 'POST_RECIPE':
        //     return{
        //         ...state,  
        //     }
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        case GET_FILTER_BY_TYPE:
            const recipesByType = action.payload === 'All' ? state.allRecipes :
            state.allRecipes.filter(r => r.diets.find(d => {
                if(d.name === action.payload) {
                    return r
                }
            }))
            if(!recipesByType.length > 0) {
                alert('No have recipes of ' + action.payload)
            }
            return {
                ...state,
                recipes: recipesByType
            }

        case GET_FILTER_BY_NAME:
            const recipesByname = action.payload === 'asc' ?
            state.recipes.sort(function(a, b){
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            }) :
            state.recipes.sort(function(a, b){
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            })
            return {
                ...state,
                recipes: recipesByname
            }  
        
        case GET_FILTER_BY_SCORE:
            const recipesByScore = action.payload === 'high' ?
            state.recipes.sort(function(a, b){
                if(a.healthScore > b.healthScore) return 1;
                if(b.healthScore > a.healthScore) return -1;
                return 0;
            }) :
            state.recipes.sort(function(a, b){
                if(a.healthScore > b.healthScore) return -1;
                if(b.healthScore > a.healthScore) return 1;
                return 0;
            }) 
            return {
                ...state,
                recipes: recipesByScore
            }
        default: 
            return state
    }
}

export default rootReducer