import jwt from "jsonwebtoken";
import User from "../models/register.js";

export async function authMiddleware(req, res, next) {
  try {
    if (!req.headers.authorization)
      return res.status(200).json({ message: "unauthorized" });

    const [bearer, token] = req.headers.authorization.split(" ");

    if (!token) return res.status(200).json({ message: "token not found" });

    const { id } = jwt.verify(token, "secretkey");
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(200).json({ message: "user not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("err in auth middleware", error);
  }
}
