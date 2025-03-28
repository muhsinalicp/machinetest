import Book from "../models/book.js";

export async function addbookController(req, res) {
  try {
    if (!req.body || !req.body.title || !req.body.author || !req.body.genre) {
      return res.status(200).json({ message: "all fields are required" });
    }

    const { _id } = req.user;

    const { title, author, genre } = req.body;

    await Book.create({
      title,
      author,
      genre,
      postedBy: _id,
    });

    return res.status(200).json({ message: "book created successfully" });
  } catch (error) {
    console.log("error in add book controller", error);
  }
}
