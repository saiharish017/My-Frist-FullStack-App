import User from "../models/user.js";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../service/asyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new CustomError("Not authorized to access this resource", 401);
  }
  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);
    req.user = User.findById(decodedJwtPayload._id, "name email role");
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this resource", 401);
  }
});
export const authorize = (...requiredRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      throw new CustomError("you are not authorized");
    }
    next();
  });
