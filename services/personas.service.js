const faker = require('faker');
const connection = require('../database/database');
class PersonasServices {

  constructor() {
    this.personas = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM pacientes_contacto_v", (err, res) => {
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
    connection.query(`SELECT * FROM pacientes_contacto_v WHERE nombre LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("ads: ", res);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM pacientes_contacto_v WHERE idpaciente = ${id}`, (err, res) => {
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
    connection.query("CALL dentalsys.paciente_crud(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[newValues.ci, newValues.direccion, newValues.nombre, newValues.apellido_paterno, newValues.apellido_materno, newValues.telefono_fijo, newValues.whatsapp, newValues.estado_civil, newValues.nacion_originaria, newValues.grado_educativo, newValues.idioma, newValues.lugar_nacimiento, newValues.sexo, newValues.fecha_nacimiento, newValues.ocupacion, newValues.StatementType, newValues.idupdate], (err, res) => {
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
    connection.query("CALL dentalsys.paciente_crud(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[newValues.ci, newValues.direccion, newValues.nombre, newValues.apellido_paterno, newValues.apellido_materno, newValues.telefono_fijo, newValues.whatsapp, newValues.estado_civil, newValues.nacion_originaria, newValues.grado_educativo, newValues.idioma, newValues.lugar_nacimiento, newValues.sexo, newValues.fecha_nacimiento, newValues.ocupacion, newValues.StatementType, id], (err, res) => {
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
    connection.query("CALL dentalsys.paciente-crud(0, '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'DELETE', ?)", id, (err, res) => {
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
module.exports = PersonasServices;
