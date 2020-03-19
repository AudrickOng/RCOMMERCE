const express = require("express");
const ProductController = require("../controllers/product.js");
const { authentication, authorization } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/", ProductController.findAll);
router.get("/:id", ProductController.findOne);

router.use(authentication, authorization);

router.post("/", ProductController.create);
router.patch("/:id", ProductController.update);
router.delete("/:id", ProductController.remove);

module.exports = router;
