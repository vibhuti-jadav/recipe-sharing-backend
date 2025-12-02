import mongoose from "mongoose";
import bcrypt from "bcrypt"

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

})


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

//login
userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("no login credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid login credentials");
    }

    return user;
};

const User = mongoose.model("User",userSchema)

export default User