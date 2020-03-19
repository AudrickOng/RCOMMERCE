const Product = require("../models/product.js");
const { verifyCreateValidity } = require("../functions/product.js");
class ProductController {
  static async findAll(req, res, next) {
    const { page } = req.query;
    try {
      const products = await Product.find();
      const start = (page - 1) * 20 || 0;
      const end = page * 20 - 1 || 19;
      res.status(200).json({
        products: products.slice(start, end),
        message: "Successfully fetched all products"
      });
    } catch (e) {
      console.log(e);
      next({ status: 500, message: "Failed to fetch all products" });
    }
  }
  static async findOne(req, res, next) {
    const { id } = req.params;
    if (id) {
      try {
        const product = await Product.findOne({ _id: id });
        if (product) {
          res
            .status(200)
            .json({ product, message: "Successfully fetched current product" });
        } else {
          next({ status: 404, message: "Current product does not exist" });
        }
      } catch (e) {
        if (e.name == "CastError") next({ error: e });
        next({ status: 500, message: "Failed to fetch current product" });
      }
    } else {
      next({ type: "missing id" });
    }
  }
  static async create(req, res, next) {
    const { name, description, image_url, price, stock } = req.body;
    const { valid, message } = verifyCreateValidity({
      name,
      image_url,
      price,
      stock
    });
    if (valid) {
      const data = { name, description, image_url, price, stock };
      if (!description) delete data.description;
      try {
        await Product.create(data);
        res.status(201).json({ message: "Successfully added new product" });
      } catch (e) {
        next({ type: "create", error: e });
      }
    } else {
      next({ status: 400, message });
    }
  }
  static async update(req, res, next) {
    const { name, description, image_url, price, stock } = req.body;
    const { id } = req.params;
    const data = { name, description, image_url, price, stock };
    for (let key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }
    if (id) {
      try {
        await Product.updateOne({ _id: id }, data);
        res
          .status(200)
          .json({ message: "Successfully updated current product" });
      } catch (e) {
        if (e.name == "CastError") next({ error: e });
        next({ status: 500, message: "Failed to update current product" });
      }
    } else {
      next({ type: "missing id" });
    }
  }
  static async remove(req, res, next) {
    const { id } = req.params;
    if (id) {
      try {
        await Product.deleteOne({ _id: id });
        res
          .status(200)
          .json({ message: "Successfully deleted current product" });
      } catch (e) {
        next({ status: 500, message: "Failed to remove current product" });
      }
    } else {
      if (e.name == "CastError") next({ error: e });
      next({ type: "missing id" });
    }
  }
}

module.exports = ProductController;
