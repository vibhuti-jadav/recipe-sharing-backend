import jwt from "jsonwebtoken";

import httpError from "./errorHandling.js";
import User from "../model/userModel.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next(new httpError("authorization failed", 500));
    }

    const token = authHeader.replace("Bearer ", "");

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decode._id, "tokens.token": token });

    if (!user) {
      next(new httpError("user not found", 404));
    }

    req.user = user;

    req.token = token;

    next();
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

export default auth;
