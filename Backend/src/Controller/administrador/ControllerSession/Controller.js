const express = require("express");
const connect = require("../../../config/db");
const mssql = require("mssql");
const route = express.Router();

route.post("/", (req, res) => {
    const body = req.body;
    new mssql.ConnectionPool(connect.config)
        .connect()
        .then((pool) => {
            return pool.request().query(`EXEC sp_create_login '${body.userSystem}'`);
        })
        .then((fields) => {
            let rows = fields.recordset;
            mssql.close();
            if (rows.length === 0) {
                res.json({ code: 404, message: "EL USUARIO NO EXISTE" });
                return;
            }
            if (rows[0].password !== body.password) {
                res.json({ code: 404, message: "CONTRASEÑA INCORRECTA" });
                return;
            }
            const token = req.GenerateToken({ it: Date.now(), id: rows[0].uuidUser, userSystem: rows[0].usuario })
            res.json({ code: 200, message: { token } });
        })
        .catch((err) => {
            console.log(err)
            mssql.close();
            res.json({ code: 404, message: "EL USUARIO NO EXISTE" });
        });
});


exports.ControllerSession = route;
