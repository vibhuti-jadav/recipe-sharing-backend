import dotenv from "dotenv"

dotenv.config({path:"./env/.env"})

import express from "express";
import userRouter from "./router/userRouter.js"
import recipeRouter from "./router/recipeRouter.js"
import httpError from "./middleware/errorHandling.js";
import connectDb from "./config/db.js";

const app = express()

app.use(express.json())

app.use("/user",userRouter)
app.use("/recipe",recipeRouter)

app.get("/",(req,res)=>{
    res.status(200).json("hello from server")
})

app.use((req,res,next)=>{
    next(new httpError("router can't find ",404))
})

app.use((error,req,res,next)=>{
    if(req.headersSent){
        return next(error)
    }

    res.status(error.statusCode || 500).json({message: error.message || "somthing went wrong please try again"})
})

const port = 5000

const startServer = async()=>{
    try {
        
        const connect = await connectDb()

        if(!connect){
            return console.log("db failed")
        }

        console.log("db connected")

         app.listen(port,()=>{
          console.log("server running on port",port)
        })

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

startServer()