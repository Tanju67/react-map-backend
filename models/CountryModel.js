const mongoose = require("mongoose");
const CountrySchema = new mongoose.Schema({
  geoLocation: [],
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  destinationPoints: [],
  destinationAddress: [],
  firstDay: {
    type: String,
    required: true,
  },
  lastDay: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Country", CountrySchema);
