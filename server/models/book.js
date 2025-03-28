import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Book = model("book", bookSchema);

export default Book;
