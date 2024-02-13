import asyncHandeler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";
import User from "../models/UserModel";
import asyncHandler from "../service/asyncHandler";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //3 days
  httpOnly: true, //only accessible through the HTTP protocol
};

export const signUp = asyncHandeler(async (req, res) => {
  // get data from user
  const { name, email, password } = req.body;
  //validation
  if (!name || !email || !password) {
    throw new CustomError("Please provide all fields", 400);
  }
  // check if user already exists in the database
  let ExistingUser = await User.findOne({ email });
  if (ExistingUser) {
    throw new CustomError("Email is already registered", 409);
  }
  const token = user.getJwtToken();
  // create a new user and save it to the database
  const user = await User.create({
    name,
    email,
    password,
  });
  // store this token in user's cookie
  res.cookie("token", token, cookieOptions);
  (err, user) => {
    if (err) throw err;
    console.log(`New User Created: ${user.name}`);
    res.status(201).json({
      success: true,
      token,
      user,
    });
  };
  //SAFETY
  user.password = undefined;
});
export const login = asyncHandeler(async (req, res) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    throw new CustomError("Please fill all ddetails", 400);
  }

  //checking if user exist or not
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new CustomError("Invalid Credentials", 401);
  }
  //checking the password
  const isPasswordMatched = await user.comparePassword(password);
  if (isPasswordMatched) {
    //if everything is fine then send back the jwt token
    const token = user.getJwtToken();
    //store it in cookies
    res.cookie("token", token, cookieOptions);

    //sending response
    res.status(200).json({
      success: true,
      token,
      data: {
        user,
      },
    });
  }

  throw new CustomError("Invalid Credentials", 401);
});
export const logout = asyncHandler(async (req, res) => {
  //remove the cookie from the client side
  res.clearCookie("token");
  //send a status of ok and end the request
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
});
