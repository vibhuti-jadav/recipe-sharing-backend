import httpError from "../middleware/errorHandling.js";
import Recipe from "../model/recipeModel.js";


const recipeAdd = async (req, res, next) => {
  try {
    const { title, description, ingredients } = req.body;

    // createdBy must come from logged-in user, not body
    const createdBy = req.user.id;

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      createdBy
    });

    await recipe.save();

    // Populate createdBy to return user details
    await recipe.populate("createdBy", "username email");

    res.status(201).json({
      message: "Recipe added successfully",
      recipe
    });

  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const getMyRecipe = async (req,res,next)=>{
    try {
        
        const recipes = (await Recipe.find({createdBy :req.user.id}).populate("role","name")).toSorted({createdAt:-1})

        if(!recipes){
            return next(new httpError("recipe data not found",404))
        }
        res.status(200).json({message:"recipe retrived succesfully",recipes,total:leaves.length})

    } catch (error) {
        return next(new httpError(error.message , 500))
    }
}



export default { recipeAdd , getMyRecipe }