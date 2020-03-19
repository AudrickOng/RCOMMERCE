const router = require("express").Router();
const productRouter = require("./product.js");
const userRouter = require("./user.js");

router.use("/product", productRouter);
router.use("/user", userRouter);

module.exports = router;
