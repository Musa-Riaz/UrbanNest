const userModel = require("../models/userModel");
const { catchAsync } = require("../middlewares/catchAsync");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../middlewares/errorMiddleware");

exports.userSignUpController =  async (req, res, next) =>{

    const {name, email, password }= req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success: "false",
            message: "Please provide all the required fields"
        })
    }

    try{
        const user = await userModel.create({
            name,
            email,
            password
        });
        
        res.status(201).json({
            success: "true",
            message:"User created successfully",
            user
        });
    }
    catch(err){
        console.log(err);
        
        return next(new ErrorHandler(err.message, 500));
    }
   

};     

exports.userSignInController = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please provide email and password", 400));
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
             next( new ErrorHandler("Invalid Email or Password", 400));

        }
        const isPasswordMatched = await user.matchPasswords(password);
        if(isPasswordMatched){
            const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.cookie('access_token', token, {httpOnly: true}).status(200).json({
                success: "true",
                message: "User logged in successfully", 
                token,
                user
               
            });
            
        }
        else{
            return next(new ErrorHandler("Invalid Email or Password", 401));
        }

       
    }
    catch(err){
        console.log(err);
        
    }
})