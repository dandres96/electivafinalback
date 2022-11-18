const mongoose = require("mongoose");
const CarSchame = mongoose.Schema({
  name: {
    type: String,
    /* require: true, */
  },
  mark: {
    type: String,
    /* require: true, */
  },
  motor: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Car", CarSchame);
