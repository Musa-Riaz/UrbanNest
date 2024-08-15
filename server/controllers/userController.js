const {catchAsync} = require("../middlewares/catchAsync");
const userModel = require("../models/userModel");
const ErrorHandler = require("../middlewares/errorMiddleware");

exports.updateUserController = catchAsync( async (req, res, next) =>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success: "false",
            message: "Please provide all the required fields"
        })
    }

    try{
       
        const user =  await userModel.findOne({email});
        if(!user){
            return next(new ErrorHandler("User not found", 404));
        }
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();
        res.status(200).json({
            success: "true",
            message: "User updated successfully", 
            user
        });
    }
    catch(err){
        console.log(err);
    }
});