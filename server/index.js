import express from "express";
import authRouter from "./routes/auth.js";
import cors from "cors";
import connectDB from "./connection.js";
import protectRouter from "./routes/protected.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import router from "./routes/user.js";

const PORT = 8080;

connectDB("mongodb://localhost:27017/fullstacktest");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello");
});

app.use("/auth", authRouter);
app.use("/user", router);

app.use("/protect", authMiddleware, protectRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
