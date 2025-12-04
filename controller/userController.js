import httpError from "../middleware/errorHandling.js"
import User from "../model/userModel.js"


const addUser = async(req,res,next)=>{
    try {

        const { name , email , password , role } = req.body;

        const newUser ={
            name,
            email,
            password,
            role
        }

        const saveUser = new User(newUser)

        await saveUser.save()

        if(!saveUser){
           return next(new httpError("user can't find" , 400))
        }

        res.status(201).json({message:"user addedd successfully",saveUser})

        
    } catch (error) {
        next(new httpError(error.message))
    }
}

const login = async(req,res,next)=>{
    try {
        
        const {email , password} = req.body;

        const user = await User.findByCredentials(email,password);

        if(!user){
          return  next(new httpError("unable to login ",400))
        }

        res.status(200).json({message:"user logged in ",user,token})

    } catch (error) {
        return next(new httpError(error.message,500))
    }
}

export default {addUser , login}