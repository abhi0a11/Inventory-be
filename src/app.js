import express from "express";
import { config } from "dotenv";
import createHttpError from "http-errors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
//config env
config();

//create express server
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1", routes);

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

//error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
