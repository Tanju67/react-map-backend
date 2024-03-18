const { StatusCodes } = require("http-status-codes");
const CountryModel = require("../models/CountryModel");
const { BadRequest } = require("../errors");

const createCountry = async (req, res) => {
  const userId = req.userData.userId;

  const country = await CountryModel.create({ ...req.body, createdBy: userId });
  res.status(StatusCodes.CREATED).json({ country });
};

const getAllCountries = async (req, res) => {
  const countries = await CountryModel.find({ createdBy: req.userData.userId });
  res.status(StatusCodes.OK).json({ countries });
};

const getCountryDetail = async (req, res) => {
  const country = await CountryModel.findOne({
    _id: req.params.id,
    createdBy: req.userData.userId,
  });

  if (!country) {
    throw new BadRequest("No country found for this id");
  }
  res.status(StatusCodes.OK).json({ country });
};

const deleteCountry = async (req, res) => {
  const country = await CountryModel.findOne({
    _id: req.params.id,
    createdBy: req.userData.userId,
  });

  if (!country) {
    throw new BadRequest("No country found for this id");
  }

  await country.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "deleted successfully!" });
};

module.exports = {
  createCountry,
  getAllCountries,
  getCountryDetail,
  deleteCountry,
};
