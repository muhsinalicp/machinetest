import { Router } from "express";
import { addbookController } from "../controllers/addBookController.js";

const protectRouter = Router();

protectRouter.post("/addbook", addbookController);

export default protectRouter;
