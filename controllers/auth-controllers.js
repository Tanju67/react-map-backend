const { StatusCodes } = require("http-status-codes");
const { BadRequest, UnauthenticatedError } = require("../errors");
const UserModel = require("../models/UserModel");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequest("You must provide all inputs");
  }

  const user = await UserModel.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  console.log(token);

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      token,
    },
  });
};

const getCurentUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.userData.userId });
  res.status(StatusCodes.OK).json({ name: user.name, id: user._id });
};

module.exports = { register, login, getCurentUser };
