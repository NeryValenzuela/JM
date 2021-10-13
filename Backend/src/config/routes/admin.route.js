const express = require("express");
const ControllerProvider = require("../../Controller/administrador/ControllerProvider/Controller");
const ControllerMechanic = require("../../Controller/administrador/ControllerMechanic/ControllerMechanic");
const ControllerUserSystem = require("../../Controller/administrador/ControllerUserSystem/ControllerUserSystem");
const ControllerCustumer = require("../../Controller/administrador/ControllerCustumer/ControllerCustumer");
const ControllerCar = require("../../Controller/administrador/ControllerCar/ControllerCar");
const ControllerProduct = require("../../Controller/administrador/ControllerProduct/ControllerProduct");
const ControllerWorkLog = require("../../Controller/administrador/ControllerWorkLog/ControllerWorkLog");
const ControllerLine = require("../../Controller/administrador/ControllerLine/ControllerLine");
const ControllerBrand = require("../../Controller/administrador/ControllerBrand/ControllerBrand");
const ControllerJobAssigment = require("../../Controller/administrador/ControllerJobAssigment/ControllerJobAssigment");
const ControllerShoppingLog = require("../../Controller/administrador/ControllerShoppingLog/ControllerShoppingLog");

const route = express.Router();

route.use("/provider", ControllerProvider.ControllerProvider);
route.use("/mechanic", ControllerMechanic.ControllerMechanic);
route.use("/UserSystem", ControllerUserSystem.ControllerUserSystem);
route.use("/custumer", ControllerCustumer.ControllerCustumer);
route.use("/car", ControllerCar.ControllerCar);
route.use("/product", ControllerProduct.ControllerProduct);
route.use("/orden-de-trabajo", ControllerWorkLog.ControllerWorkLog);
route.use("/line", ControllerLine.ControllerLine);
route.use("/brand", ControllerBrand.ControllerBrand);
route.use("/job", ControllerJobAssigment.ControllerJobAssigment);
route.use("/shoppingLog", ControllerShoppingLog.ControllerShoppingLog);


exports.routerAdmin = route;
