const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./config/db");
const routes = require("./routes");

app.use(cors());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());

app.use("/api", routes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`Server on port <===> ${PORT}`));
