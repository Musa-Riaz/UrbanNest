const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userScehma = new mongoose.Schema({
    
    name:{
        type:String,
        required: true,

    },
    email:{
        type:String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password:{
        type:String, 
        required: true, 
    },
    avatar:{
        type:String,
        default: 'https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg'
    }
},{timestamps: true});

userScehma.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

userScehma.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password);
}


module.exports = mongoose.model("User", userScehma);