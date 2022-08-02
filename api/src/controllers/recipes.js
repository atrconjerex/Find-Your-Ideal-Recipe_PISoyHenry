const { Recipe, Diet } = require ('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;


//UTIL FUNCTIONS =========================================
const getAPIInfo = async () => {
    const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const apiInfo = api.data.results.map(d => {
        return {
            ID: d.id,
            name: d.title,
            image: d.image,
            dishTypes: d.dishTypes.map(d => { return { name: d }}),
            diets: d.diets.map(d => { return { name: d }}),
            dish_summary: d.summary,
            healthScore: d.healthScore,
            instructions: d.analyzedInstructions
        }
    })
    return apiInfo;
}

const getDBInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
     
}

const getAllRecipes = async () => {
    const apiInfo = await getAPIInfo()
    const dbInfo = await getDBInfo()
    const allInfo = apiInfo.concat(dbInfo)
    return allInfo;
}

//FUNCTIONS TO EXPORT =====================================

const getRecipes = async (req, res) => {
    const { name } = req.query
    try {
        const recipesTotal = await getAllRecipes()
        if(name) {
            let recipeName = recipesTotal.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
            recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(418).json({ msg: 'La receta no existe' })
        } else {
            res.status(200).send(recipesTotal);
        }
    } catch(error) {
        res.status(404).json({ msg: 'Error when searching in the api' })
        return error;  
    }
};

const getRecipesid = async (req, res) => {
    const { id } = req.params;
    try {
        const allRecipes = await getAllRecipes();
        if(id) {
            let recipeId = allRecipes.filter(e => e.ID == id) // cambiar aca
            recipeId.length ?
            res.status(200).json(recipeId) :
            res.status(418).json({ msg: 'Recipe not find' })
        } else {
            res.status(404).json({ msg: 'id Recipe is not find' })
        }
    } catch(error) {
        res.status(404).json({ msg: 'Recipe not found from api' })  
        return error;  
    } 
};

const postRecipe = async (req, res) => {
    const { name, dish_summary, healthScore, instructions, image, diets } = req.body
    if (!name || !dish_summary) return res.status(400).send('Name or Dish Summary cannot be empty');
    try {
        const recipeCreated = await Recipe.create({
           name,
           dish_summary,
           healthScore,
           instructions,
           // image,
           diets
        })

        for(let i = 0; i < diets.length; i++) {
            let diet = await Diet.findOne({
               where: { name: diets[i] }
            })
            recipeCreated.addDiet(diet)
        }
        res.status(200).send('Successfully created recipe')
    } catch (error) {
        res.status(404).json({ msg: 'Recipe not created' })
        return error;
    }   
};

module.exports = {
    getRecipes,
    getRecipesid,
    postRecipe
}