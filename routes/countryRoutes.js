const express = require("express");
const route = express.Router();

const {
  createCountry,
  getAllCountries,
  getCountryDetail,
  deleteCountry,
} = require("../controllers/country-controllers");

const checkAuth = require("../middleware/auth");

route.use(checkAuth);

route.post("/", createCountry);

route.get("/", getAllCountries);

route.get("/:id", getCountryDetail);

route.delete("/:id", deleteCountry);

module.exports = route;
