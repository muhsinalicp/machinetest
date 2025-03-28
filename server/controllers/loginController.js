import { compare } from "bcryptjs";
import User from "../models/register.js";
import jwt from "jsonwebtoken";

export async function loginController(req, res) {
  console.log(req.body);

  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(201).json({ message: "all fields are required" });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ message: "user not found" });

  const comparePass = await compare(password, user.password);
  if (!comparePass)
    return res.status(200).json({ message: "invalid password" });

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, "secretkey");

  return res.status(200).json({ token, message: "login successfull" });
}
