const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const routes = require("./routes");
require("dotenv").config();
require("./config/db");

const path = require("path");

const https = require("https");
const fs = require("fs");

/* const options = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/adminspace.nevtis.com/privkey.pem"
  ),
  cert: fs.readFileSync("/etc/letsencrypt/live/adminspace.nevtis.com/cert.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/adminspace.nevtis.com/chain.pem"),
  key: fs.readFileSync(
    "/etc/letsencrypt/live/clientspace.nevtis.com/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/clientspace.nevtis.com/cert.pem"
  ),
  ca: fs.readFileSync("/etc/letsencrypt/live/clientspace.nevtis.com/chain.pem"),
}; */

app.use(cors());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

app.use(express.static(path.join(__dirname, "build")));

app.use(cookieParser());

app.use("/api", routes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 4001;

/* const server = https.createServer(options, app);

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is listening on port ${PORT}`);
}); */

app.listen(PORT, () => console.log(`USER-SERVER ON PORT: ${PORT}`));
