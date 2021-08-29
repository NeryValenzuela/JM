const express = require("express");
const ControllerProvider = require("../../Controller/administrador/ControllerProvider/Controller");
const route = express.Router();

route.use("/provider", ControllerProvider.ControllerProvider);

exports.routerAdmin = route;
