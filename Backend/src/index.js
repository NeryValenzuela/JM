const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const routerAdmin = require("./config/routes/admin.route");
const auth = require("authmiddlewarenodejs")
const app = express();
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}
const AUTHconfig = {
  UrlStart: "/login",
  ActiveTime: "2h",
  KEY_TOKEN: process.env.HASH_TOKEN,
  NameToken: "x-token-access",
  EncryptionMethod: "HS256"
}

app.use("/admin", cors({ origin: "*" }), auth(AUTHconfig), routerAdmin.routerAdmin);

app.listen(3000, () => {
  console.log("listen http://localhost:3000/");
})

