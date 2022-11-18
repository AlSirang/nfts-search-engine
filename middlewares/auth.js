import createHttpError from "http-errors";
import User from "../models/User";
import { verifyToken } from "./utils";

/**
 * @dev custom middleware for authenticating users
 * @param {Request Object} req
 * @param {Response Object} res
 * @param {middlewares function} next
 */
export const authenticate = async (req, res, next) => {
  try {
    const jwtToken = req.headers.cookie;

    if (!jwtToken) return res.sendStatus(401);
    const tokenDecode = verifyToken(jwtToken.split(" ")[1]);

    const user = await User.findOne({ _id: tokenDecode.sub });
    req.user = user;

    next();
  } catch (err) {
    next(createHttpError(500, err.message || err));
  }
};
