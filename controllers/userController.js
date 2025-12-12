import httpError from "../middleware/errorHandling.js"
import User from "../models/userModel.js";


const addUser = async(req,res,next)=>{
    try {

        const { name , email , password , role } = req.body;
        
        let existingUser = await User.findOne({ email });

        if (existingUser) {
        return next(new httpError("user already exist  with this id", 400));
        }

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
      return next(new httpError(error.message))
    }
}

const login = async(req,res,next)=>{
    try {
        
        const {email , password} = req.body;

        const user = await User.findByCredentials(email,password);

        if(!user){
            next(new httpError("unable to login ",400))
        }

        const token = await user.generateAuthToken()

        res.status(200).json({message:"user logged in ",user , token})

    } catch (error) {
        return next(new httpError(error.message,500))
    }
}
const update = async (req, res, next) => {
  try {
    // FIXED: Request.body → req.body
    const updates = Object.keys(req.body);

    const allowUpdates = ["name", "email", "password", "role"];

    const isAllowedUpdates = updates.every((field) =>
      allowUpdates.includes(field)
    );

    if (!isAllowedUpdates) {
      return next(new httpError("only allowed field can be updated", 400));
    }

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new httpError("user not found", 404));
    }

    // Email validation (FIXED: single & → &&)
    const { email } = req.body;

    if (email) {
      const existingUser = await User.findOne({ email });

      if (
        existingUser &&
        existingUser._id.toString() !== user._id.toString()
      ) {
        return next(new httpError("email already exists", 400));
      }
    }

    // Update fields
    updates.forEach((field) => {
      user[field] = req.body[field];
    });

    // triggers pre('save') for password hashing
    await user.save();

    res.status(200).json({
      message: "user data updated successfully",
      user,
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};


const deleteUser = async (req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete(req.user.id)

        if(!user){
            next(new httpError("failed to delete user",500))
        }
        res.status(200).json({message:"user account deleted successfully"})

    } catch (error) {
        return next(new httpError(error.message,500))
    }
}

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({ user });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

const logOut = async (req, res, next) => {
  try {
    const user = req.user;

    const token = req.token;

    user.tokens = user.tokens.filter((t) => {
      return t.token !== token;
    });

    await user.save();

    res.status(200).json({ mesage: "user log-out successfullyy" });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};



export default {addUser , login , update , deleteUser , authLogin , logOut}