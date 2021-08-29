const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const routerAdmin = require("./config/routes/admin.route");

const app = express();
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.use("/admin", cors({ origin: "*" }), routerAdmin.routerAdmin);

app.listen(3000, () => {
  console.log("listen http://localhost:3000/");
});
