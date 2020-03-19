const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  name: String,
  quantity: Number,
  product_id: { type: mongoose.SchemaTypes.ObjectId, ref: "Product" },
  extra: { _id: false }
});

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    required: true
  },
  password: String,
  cart: [cartSchema],
  role: {
    type: String,
    required: true
  },
  extra: { _id: false }
});

userSchema.plugin(uniqueValidator, {
  message: "{PATH} has already been taken"
});

const User = mongoose.model("User", userSchema);

module.exports = User;
