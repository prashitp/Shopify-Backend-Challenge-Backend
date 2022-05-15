const mongoose = require('mongoose');

const itemSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    qty: {type: Number, required: true},
  price: {type: Number, required: true},
  date: {type: String, required: true},
  isdeleted: {type: String, required: true},
  comments: {type: String, required: false},
}

module.exports = mongoose.model("Item", itemSchema);