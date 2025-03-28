import { hash } from "bcryptjs";
import User from "../models/register.js";

export async function registerController(req, res) {
  try {
    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
      return res.status(401).json({ message: "all fields are required" });
    }

    const { name, email, password } = req.body;

    const hashedpassword = await hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedpassword,
    });

    return res.status(201).json({ message: "registered successfully" });
  } catch (error) {
    console.log("error happened in registercontroller", error);
  }
}
