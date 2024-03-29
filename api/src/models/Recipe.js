const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el model
  sequelize.define('recipe', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dish_summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.FLOAT
    },
    instructions: {
      type: DataTypes.TEXT
    }
    // image: {
    //   type: DataTypes.STRING,
    //   defaultValue: "https://images.food52.com/wulM9ARxwbCaQEeW0R6fmjisGZY=/fit-in/1200x1200/2d6bdab3-4206-4c3d-ac52-e428177251bc--default-recipe.jpg"
    // }
  });
};
