const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const {ErrorHandler} = require("../middlewares/errorMiddleware");

exports.verifyUser = async (req, res, next) => {

    const token = req.cookies.access_token;
    
    if(!token){
        return next(new ErrorHandler("Please login to access this route", 401));
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err,decoded) =>{
        if(err){
            return next(new ErrorHandler("Please login to access this route", 401));
        }
        //passing the id obtained by verifying the user in the request to the next function
        req.user = decoded;
        next();
    }
)}