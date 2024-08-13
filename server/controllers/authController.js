const userModel = require("../models/userModel");
const { catchAsync } = require("../middlewares/catchAsync");
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