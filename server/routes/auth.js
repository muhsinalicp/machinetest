import { Router } from "express";
import { loginController } from "../controllers/loginController.js";
import { registerController } from "../controllers/registerController.js";

const authRouter = Router();

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

export default authRouter;
