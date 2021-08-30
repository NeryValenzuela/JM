const express = require("express");
const connect = require("../../../config/db");
const mssql = require("mssql");
const route = express.Router();

route.get("/", (req, res) => {
  new mssql.ConnectionPool(connect.config)
    .connect()
    .then((pool) => {
      return pool.request().query(`EXEC sp_search_line`);
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
  new mssql.ConnectionPool(connect.config)
    .connect()
    .then((pool) => {
      return pool.request().query(`EXEC sp_create_line '${body.uuidBrand}','${body.line}'`);
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
      return pool.request().query(`EXEC sp_update_line '${body.uuidLine}','${body.uuidBrand}','${body.line}'`);
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
      return pool.request().query(`EXEC sp_delete_line '${id}'`);
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
exports.ControllerLine = route;
