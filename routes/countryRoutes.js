const express = require("express");
const route = express.Router();

const {
  createCountry,
  getAllCountries,
  getCountryDetail,
  deleteCountry,
} = require("../controllers/country-controllers");

route.post("/", createCountry);

route.get("/", getAllCountries);

route.get("/:id", getCountryDetail);

route.delete("/", deleteCountry);

module.exports = route;
