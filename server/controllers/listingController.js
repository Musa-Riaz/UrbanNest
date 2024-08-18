const { catchAsync } = require("../middlewares/catchAsync");
const listingModel = require("../models/listingModel");
const {ErrorHandler} = require("../middlewares/errorMiddleware");
exports.createLisitingController = catchAsync(async (req, res, next) =>{

    try{

        const listing = await listingModel.create(req.body);
        if(listing){
            res.status(201).json({
                success: true,
                message: "Listing created successfullu",
                listing
            });

        }

        else{
            return next(new ErrorHandler("Listing not created", 400));
        }

    }
    catch(err){
        console.log(err);
        return next(new ErrorHandler("Listing not created", 400));
    }

}) 