const { Recipe, Diet } = require ('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;
const APIURL = 'https://api.spoonacular.com/recipes/';

//UTIL FUNCTIONS =========================================
const getAPIInfo = async () => {
    const api = await axios.get(`${APIURL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const apiInfo = api.data.results.map(d => {
        return {
            ID: d.id,
            name: d.title,
            image: d.image,
            score: d.spoonacularScore,
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
    const recipesTotal = await getAllRecipes()
    if(name) {
        let recipeName = recipesTotal.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(418).json({ msg: 'La receta no existe' })
    } else {
        try {
          res.send(recipesTotal)
        } catch (error) {next(error)};  
    }
};

const getRecipesid = async (req, res) => {
    const { idReceta } = req.params;
    const allRecipes = await getAllRecipes();
    if(idReceta) {
        let recipeId = allRecipes.filter(e => e.ID == idReceta) // cambiar aca
        recipeId.length ?
          res.status(200).json(recipeId) :
          res.status(418).json({ msg: 'No se encontro la receta' })
    }
};

const postRecipe = async (req, res) => {
  const { name, dish_summary, healthScore, instructions, img, score, diets } = req.body
  if (!name || !dish_summary) return res.status(400).send('Name and Dish Summary cannot be empty');
  try {
    const recipeCreated = await Recipe.create({
        name,
        dish_summary,
        healthScore,
        instructions,
        img,
        score,
        diets
    })

    for(let i = 0; i < diets.length; i++) {
        let diet = await Diet.findOne({
            where: { name: diets[i] }
        })
        recipeCreated.addDiet(diet)
    }
    res.status(200).send('Receta creada con exito')
  } catch (error) {next(error)};   
};

module.exports = {
    getRecipes,
    getRecipesid,
    postRecipe
}