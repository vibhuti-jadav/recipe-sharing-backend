import httpError from "../middleware/errorHandling.js";
import Recipe from "../model/recipeModel.js";


const recipeAdd = async (req, res, next) => {
  try {
    const { title, description, ingredients } = req.body;

   
    const createdBy = req.user.id;

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      createdBy
    });

    await recipe.save();

    await recipe.populate("createdBy", "username email");

    res.status(201).json({
      message: "Recipe added successfully",
      recipe
    });

  } catch (error) {
    next(new httpError(error.message, 500));
  }
};


const getMyRecipe = async (req, res, next) => {
  try {
    let recipes;

  
    if (req.user.role === "admin") {
      recipes = await Recipe.find()
        .populate({
          path: "createdBy",
          select: "name role"
        })
        .sort({ createdAt: -1 });
    } 
    

    else {
      recipes = await Recipe.find({ createdBy: req.user.id })
        .populate({
          path: "createdBy",
          select: "name role"
        })
        .sort({ createdAt: -1 });
    }

    if (!recipes) {
      return next(new httpError("No recipes found", 404));
    }

    res.status(200).json({
      message: "Recipes retrieved successfully",
      recipes,
      total: recipes.length,
    });

  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};



const updateRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;

   
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return next(new httpError("Recipe not found", 404));
    }


    if (recipe.createdBy.toString() !== req.user.id) {
      return next(new httpError("Unauthorized: You cannot edit this recipe", 403));
    }

  
    const allowedFields = ["title", "description", "ingredients"];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        recipe[field] = req.body[field];
      }
    });

    await recipe.save();

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe
    });

  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};


const deleteRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;

   
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return next(new httpError("Recipe not found", 404));
    }

    
    if (recipe.createdBy.toString() !== req.user.id) {
      return next(new httpError("Unauthorized: You cannot delete this recipe", 403));
    }

    await Recipe.findByIdAndDelete(recipeId);

    res.status(200).json({
      message: "Recipe deleted successfully"
    });

  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};



export default { recipeAdd , getMyRecipe , updateRecipe , deleteRecipe }