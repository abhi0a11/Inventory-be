import mongoose from "mongoose";
import { config } from "dotenv";
config();

const { MONGO_URL } = process.env;

// mongo connection
const connectDb = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected");
    });

  mongoose.connection.on("error", err => {
    console.log("db connection error: ", err);
    process.exit(1);
  });
};

export default connectDb;
