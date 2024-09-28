import express from "express";
import connectDb from "./databse.js";
import app from "./app.js";

//db
connectDb();

const PORT = process.env.PORT || 3001;
let server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    process.exit(1);
    //if exit code = 1, exited with an error, if 0, exited without error
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = error => {
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  if (server) {
    process.exit(1);
    //if exit code = 1, exited with an error, if 0, exited without error
  }
});
