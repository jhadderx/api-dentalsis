const { response } = require('express');
const express = require('express');
const connection = require('./../database/database');
const CitasServices = require('./../services/citas.service');

const router = express.Router();
const service = new CitasServices();

router.get('/xxx', async(req, res) => {
  res.json({text: 'the ad doesnt exist'});
})

router.get('/', async(req, res) => {
  service.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal en el servidor."
      });
    else res.json(data);
  });
})

router.get('/:id', async(req, res) =>{
  service.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `no se encontró el id id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "algo salió mal al encontrar el id " + req.params.id
        });
      }
    } else res.send(data);
  });
})

router.post('/', async(req, res) =>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const values = {
    razon: req.body.razon,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    hora: req.body.hora,
    persona_id: req.body.persona_id,
    dentista_id: req.body.dentista_id
  };

  service.create(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.send(data);
  });
})

router.patch('/:id', async(req, res) =>{
  if (!req.body) {
    res.status(400).send({
      message: "No hay elementos"
    });
  }

  const values = {
    title: req.body.title,
    description: req.body.description,
    age: req.body.age,
    category: req.body.category,
    city: req.body.city,
    address: req.body.address,
    whatsapp: req.body.whatsapp,
    userId: req.body.userId,
    position: req.body.position,
    verificate: req.body.verificate
  };

  service.updateById(req.params.id, values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.send(data);
  });

})

router.delete('/:id', async(req, res) =>{
  service.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Algo salió mal al encontrar" + req.params.id
        });
      }
    } else res.send({ message: `Excelente` });
  });
})


module.exports = router;
