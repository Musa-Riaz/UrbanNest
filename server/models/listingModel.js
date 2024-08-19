const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Regular price is required"],
    },
    discountPrice: {
      type: Number,
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
    },
    furnished: {
      type: Boolean,
      required: [true, "Furnished is required"],
    },
    parking: {
      type: Boolean,
      required: [true, "Parking is required"],
    },
    type: {
        type: String,
      enum: ["rent", "sale"],
      required: [true, "Type is required"],
    },
    offer: {
      type: Boolean,
    },
    imageUrls: {
      type: [String],
      required: true
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema); // Exporting the model to be used in the controller
