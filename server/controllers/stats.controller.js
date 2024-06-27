import mongoose from "mongoose";
import Budget from "../models/Budget.Model.js";
import errorHandler from "../errors/error.js";

export const overview = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(errorHandler(404, "Invalid User"));
    }
    const budgets = await Budget.find({ user: userId });
    res
      .status(200)
      .send({ success: true, message: "overview of expense sent", budgets });
  } catch (error) {
    next(error);
  }
};
