import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcrypt from "becryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: ["true", "Name is required"],
        maxLength:[50, "Name must be less then 50 chars"]

    },
    email:{
        type: String,
        required:["true", "Email is required"]

    },
    password:{
        type:String,
        required: [true,"Pasword is Required"],
        minLength:[8,"password must be at least 8 chars"],
        select:false
    },
    role:{
        type: String,
        enum: Object.values(AuthRoles),
        default:AuthRoles.USER
    }


}, {timestamps: true})

// Encrypt the password  befor the saving

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){

        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
});
//Compare Password
userSchema.methods  = {
    comparePassword:
    async function(enteredPassword) {
    try {
        // Use bcrypt.compare to compare plaintext and hashed passwords
        return await bcrypt.compare(enteredPassword, this.password);

    } catch (error) {
        throw error;
    }
}};


export default mongoose.model("User", userSchema);
