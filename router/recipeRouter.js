import express from "express"
import auth from "../middleware/auth.js";
import recipeController from "../controllers/recipeController.js";

const router = express.Router();

router.use(auth)

router.post("/add",recipeController.recipeAdd)

router.get("/myrecipe",recipeController.getMyRecipe)

router.patch("/update/:id", recipeController.updateRecipe);

router.delete("/delete/:id", recipeController.deleteRecipe);

export default router