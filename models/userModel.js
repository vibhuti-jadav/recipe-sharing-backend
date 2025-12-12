import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    },
    tokens:[
      {
        token:{
          type:String,
          trim:true
        }
      }
    ]

})


userSchema.pre("save", async function (next) {
   try {
            const user = this;
            if(user.isModified("password")){
                user.password = await bcrypt.hash(user.password,8)
            }
            console.log("hashed passwod")


    } catch (error) {
        throw new Error(error.message

        )
    }
});


//login
userSchema.statics.findByCredentials = async function (email, password) {
  try {
      const user = await this.findOne({ email });
    if (!user) {
        throw new Error("no login credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid login credentials");
    }

    return user;
    
  } catch (error) {
    throw new Error(error.message);
  }
};


//jwt
userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET
      //{expiresIn : "1m"}
    );

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};


const User = mongoose.model("User",userSchema)

export default User