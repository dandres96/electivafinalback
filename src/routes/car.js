const express = require("express");
const CarController = require("../controllers/car");
const multipart = require("connect-multiparty");
const middleware_user_authenticated = require("../middleware/authenticated_user");
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });


const api = express.Router();

api.post("/addcar", CarController.addCar);
api.get(
  "/cars",
  CarController.getCars
);

  api.put("/updatecar/:id", CarController.updateCar);
  api.delete("/deletecar/:id", CarController.deleteCar);


module.exports = api;
