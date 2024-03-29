const { Diet } = require ('../db.js');
const router = require('express').Router();

router.get('/', function(req, res, next) {
    const diets = [
        "gluten free",
        "dairy free",
        "paleolithic",
        "ketogenic",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "primal",
        "fodmap friendly",
        "whole 30"
    ]

    diets.forEach(d => {
        Diet.findOrCreate({
            where: { name: d }
        })
    })

    return Diet.findAll()
    .then(r => res.json(r))
    .catch((error) => {return error;})
});

module.exports = router;