const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["FoodTruck", "StreetFood"], required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"], // Ensures "Point" is the only valid type
      required: true,
    },
    coordinates: {
      type: [Number], // Expecting [longitude, latitude]
      required: true,
    },
  },
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Vendor", vendorSchema);
