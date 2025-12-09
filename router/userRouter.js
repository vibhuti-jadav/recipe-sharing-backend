import express from "express"
import userController from "../controller/userController.js"
import auth from "../middleware/auth.js"


const router = express.Router()

router.post("/add",userController.addUser)
router.post("/login",userController.login)
router.patch("/update",auth, userController.update)

router.delete("/delete",auth,userController.deleteUser)

router.post("/authlogin",auth,userController.authLogin)

router.post("/logout", auth, userController.logOut);

export default router