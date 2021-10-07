const express = require("express");
const connect = require("../../../config/db");
const mssql = require("mssql");
const route = express.Router();

route.get("/", (req, res) => {
  new mssql.ConnectionPool(connect.config)
    .connect()
    .then((pool) => {
      return pool.request().query(`EXEC sp_search_jobAssigment`);
    })
    .then((fields) => {
      mssql.close();
      let rows = fields.recordset;
      res.json({ code: 200, message: rows });
    })
    .catch((err) => {
      console.log(err)
      mssql.close();
      res.json({ code: 404, message: {} });
    });
});
route.post("/", (req, res) => {
  const body = req.body;
  body.bonus = body.bonus == '' ||  body.bonus == undefined ? null:body.bonus
  new mssql.ConnectionPool(connect.config)
    .connect()
    .then((pool) => {
      var jo = `EXEC sp_create_jobAssigment '${body.uuidMechanic}','${body.uuidCar}','${body.entryDate}','${body.departureDate}','${body.nextService}','${body.dateNextService}','${body.mileage}',${body.bonus}`
     console.log(jo)
      return pool.request().query(jo);
    })
    .then((fields) => {
      mssql.close();
      res.json({ code: 200, message: "SE CREO EXITOSAMENTE" });
    })
    .catch((err) => {
      console.log(err)
      mssql.close();
      res.json({ code: 404, message: "NO SE CREO EXITOSAMENTE" });
    });
});
route.put("/", (req, res) => {
  const body = req.body;
  new mssql.ConnectionPool(connect.config)
    .connect()
    .then((pool) => {
      return pool.request().query(`EXEC sp_update_jobAssigment '${body.uuidMechanic}','${body.uuidCar}','${body.entryDate}','${body.departureDate}','${body.nextService}','${body.dateNextService}','${body.mileage}','${body.bonus}'`);
    })
    .then((fields) => {
      mssql.close();
      res.json({ code: 200, message: "SE ACTUALIZO EXITOSAMENTE" });
    })
    .catch((err) => {
      console.log(err)
      mssql.close();
      res.json({ code: 404, message: "NO SE ACTUALIZO EXITOSAMENTE" });
    });
});
route.delete("/:id", (req, res) => {
  const id = req.params.id;
  new mssql.ConnectionPool(connect.config)
    .connect()
    .then((pool) => {
      return pool.request().query(`EXEC sp_delete_jobAssigment '${id}'`);
    })
    .then((fields) => {
      mssql.close();
      res.json({ code: 200, message: "SE ELIMINO EXITOSAMENTE" });
    })
    .catch((err) => {
      console.log(err)
      mssql.close();
      res.json({ code: 404, message: "NO SE ELIMINO EXITOSAMENTE" });
    });
});
exports.ControllerJobAssigment = route;
