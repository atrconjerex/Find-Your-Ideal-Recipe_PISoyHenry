const { Router } = require('express');
//ROUTERS:
const router = Router();

//CONTROLLERS:
const recipesController = require('../controllers/recipes');
const dietsController = require('../controllers/diets');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/recipes', recipesController.getRecipes);
router.get('/recipes', recipesController.getRecipes);
router.get('/recipes/:id', recipesController.getRecipesid);
router.post('/recipe', recipesController.postRecipe);

router.use('/diets', dietsController); 


module.exports = router;
