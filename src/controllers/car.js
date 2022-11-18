const bcrypt = require("bcrypt-nodejs");
const Car = require("../models/car");
const jwt = require("../services/jwt");
const fs = require("fs");
const path = require("path");

const addCar = (req, res) => {
  const car = new Car();
  const { name, mark , motor } = req.body;
  car.name = name;
  car.mark = mark;
  car.motor = motor;

  car.save((err, carStored)=>{
    if(err){
        res.status(500).send({message:"El carro ya existe"})
    }else{
        if(!carStored){
            res.status(404).send({message: "Error al crear el carro"})
        }else{
            res.status(200).send({car: carStored, message:"Carro creada exitosamente"})
        }
    }
})

};
  
const getCars = (req, res) => {
  Car.find().then((cars) => {
    !cars
      ? res.status(404).send({ message: "No se ha encontrado ningún carro" })
      : res.status(200).send({ cars });
  });
};

async function updateCar(req, res) {
  let carData = req.body;
  const params = req.params;

  /* Actualizamos el resto de los datos */
  Car.findByIdAndUpdate({ _id: params.id }, carData, (err, carUpdate) => {
    err
      ? res.status(500).send({ message: "Error del servidor." })
      : !carUpdate
      ? res.status(404).send({ message: "No se encontro el carro." })
      : res.status(200).send({ message: "Carro actualizado correctamente." });
  });
}

const deleteCar = (req, res) => {
  const { id } = req.params;

  Car.findByIdAndRemove(id, (err, carDeleted) => {
    err
      ? res.status(500).send({ message: "Error del servidor." })
      : !carDeleted
      ? res.status(404).send({ message: "Usuario no encontrado." })
      : res
          .status(200)
          .send({ message: "El carro ha sido eliminado correctamente." });
  });
};

module.exports = {
  addCar,
  getCars,
  updateCar,
  deleteCar,
};
