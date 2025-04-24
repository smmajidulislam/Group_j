const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnect = require("./dbConnect/dbConnect");
const router = require("./rotue/rotue");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // cookie allow করার জন্য
  })
);
app.use(express.json());
dbConnect();

app.use("/api", router);
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: err.message,
  });
  next();
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
