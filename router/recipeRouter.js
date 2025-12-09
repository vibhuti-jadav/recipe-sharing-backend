import express from "express"
import auth from "../middleware/auth.js";
import recipeController from "../controller/recipeController.js";

const router = express.Router();

router.use(auth)

router.post("/add",recipeController.recipeAdd)

export default router