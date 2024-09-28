import { config } from "dotenv";
import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../models/index.js";
import bcrypt from "bcryptjs";
config();
const { DEFAULT_PIC } = process.env;

export const createUser = async userData => {
  const { name, email, picture, password } = userData;
  // console.log(userData);
  if (!name || !email || !password) {
    throw createHttpError.Conflict("Please fill all fields");
  }

  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Enter a valid Email address");
  }

  //check if user already exist
  const checkUser = await UserModel.findOne({ email });
  if (checkUser) {
    throw createHttpError.BadRequest("User already exists.");
  }

  //check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Password length should be between 6 and 128"
    );
  }

  //add user to database
  const newUser = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PIC,
    password,
  }).save();

  return newUser;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  //check if email/user exists
  if (!user) throw createHttpError.NotFound("Email id not found");

  //compare password
  let passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) throw createHttpError.NotFound("Invalid Password");

  return user;
};
