import { connect } from "mongoose";

export default async function connectDB(uri) {
  try {
    return connect(uri).then(() => console.log("Database connected"));
  } catch (error) {
    console.log("error happened during Database connection", error);
  }
}
