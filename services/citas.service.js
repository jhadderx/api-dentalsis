const faker = require('faker');
const connection = require('../database/database');
class CitasServices {

  constructor() {
    this.citas = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM citas", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("ads: ", res);
      result(null, res);
    });
  };

  findById = (id, result) => {
    connection.query(`SELECT * FROM citas WHERE idcita = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("devolver: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };


  create = (newValues, result) => {
    connection.query("INSERT INTO citas SET ?", newValues, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("valores ingresados: ", { id: res.insertId, ...newValues });
      result(null, { id: res.insertId, ...newValues });
    });
  };

  updateById = (id, values, result) => {
    connection.query(
      "UPDATE ad SET title = ?, description = ?, age = ?, category = ?, city = ?, address = ?, whatsapp = ?, userId = ?, position = ?, verificate = ? WHERE adId = ?",
      [values.title, values.description, values.age, values.category, values.city, values.address, values.whatsapp, values.userId, values.position, values.verificate, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "no se encontró el id" }, null);
          return;
        }

        console.log("Anuncio actualizado: ", { id: id, ...values });
        result(null, { id: id, ...values });
      }
    );
  };

  remove = (id, result) => {
    connection.query("DELETE FROM citas WHERE idcita = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "no se encontró el id" }, null);
        return;
      }

      console.log("se eliminó el anuncio: ", id);
      result(null, res);
    });
  };

}
module.exports = CitasServices;
