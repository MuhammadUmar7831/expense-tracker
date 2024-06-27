import { errorHandler } from "../errors/error.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const token = req.cookies["access token"];
  if (!token) return next(errorHandler(401, "please login to continue."));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};