const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: { type: String, required: false },
  image_url: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
});

productSchema.plugin(uniqueValidator, {
  message: "{PATH} has already been taken"
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
