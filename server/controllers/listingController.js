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

});

exports.deleteListingController = catchAsync(async (req, res, next) => {
    try{

         await listingModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Listing deleted successfully",

        });

    }
    catch(err){
        console.log(err);
        return next(new ErrorHandler(err.message, 400));
    }
});

exports.updateListingController = catchAsync (async (req, res, next) => {

    try{

        const listing = await listingModel.findByIdAndUpdate(req.params.id, {
            $set : {
                name: req.body.name,
                description: req.body.description,
                address: req.body.address,
                regularPrice: req.body.regularPrice,
                discountPrice:req.body.discountPrice,
                bathrooms:req.body.bathrooms,
                bedrooms:req.body.bedrooms,
                furnished:req.body.furnished,
                parking:req.body.parking,
                type:req.body.type,
                offer:req.body.offer,
                imageUrls:req.body.imageUrls,
                userId:req.body.userId,
            }
        }, {new: true});
        if(listing){
            res.status(200).json({
                success:true,
                message:"Listing successfully updated",
                listing
            });
        }
        else{
            return next(new ErrorHandler(err.message, 400));
        }

    }
    catch(err){
        console.log(err);

    }

});