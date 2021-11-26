const faker = require('faker');
const connection = require('../database/database');
class DentistasServices {

  constructor() {
    this.dentistas = [];
  }

  getAll = result => {
    // CALL dentalsys.paciente_crud( 0, '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'DELETE', ?
    connection.query("SELECT * FROM dentistas", (err, res) => {
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
    connection.query(`SELECT * FROM dentalsys WHERE adId = ${id}`, (err, res) => {
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
    connection.query("CALL dentalsys.dentista_crud(?,?,?,?,?,?,?,?,?,?,?)",[newValues.ci, newValues.direccion, newValues.nombre, newValues.apellido_paterno, newValues.apellido_materno, newValues.telefono_fijo, newValues.whatsapp, newValues.correo, newValues.especialidad, newValues.StatementType, newValues.idupdate], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("valores ingresados: ", { id: res.insertId, ...newValues });
      result(null, { id: res.insertId, ...newValues });
    });
  };

  updateById = (id, newValues, result) => {
    connection.query("CALL dentalsys.dentista_crud(?,?,?,?,?,?,?,?,?,?,?)",[newValues.ci, newValues.direccion, newValues.nombre, newValues.apellido_paterno, newValues.apellido_materno, newValues.telefono_fijo, newValues.whatsapp, newValues.correo, newValues.especialidad, newValues.StatementType, newValues.idupdate], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("valores ingresados: ", { id: res.insertId, ...newValues });
      result(null, { id: res.insertId, ...newValues });
    });
  };

  remove = (id, result) => {
    connection.query("DELETE FROM dentalsys WHERE adId = ?", id, (err, res) => {
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
module.exports = DentistasServices;
