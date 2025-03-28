import { Router } from "express";
import Book from "../models/book.js";

const router = Router();

router.get("/allbooks", async (req, res) => {
  const books = await Book.find({});
  return res.status(200).json({ books });
});

export default router;
