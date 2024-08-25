const express = require("express");
const productModel = require("../models/productModel");
const router = express.Router();

const upload = require("../config/multerConfig");
const ownerModel = require("../models/ownerModel");
const userModel = require("../models/ownerModel");
const mongoose = require("mongoose");
router.get("/", function (req, res) {
  res.send("product routes");
});

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const image = req.file;
    const product = await productModel.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      image: image.buffer,
    });
    req.flash("success", "Product created Succesfully");
    res.redirect("/owner/create-new-product");
  } catch (error) {
    res.send(error.message);
  }
});
router.delete("/delete-all", async (req, res) => {
  try {
    await productModel.deleteMany({});
    console.log("Deleted all products from the database.");
    res.status(200).json({ message: "All items deleted successfully!" });
  } catch (error) {
    console.error("Error deleting items:", error);
    res.status(500).json({ message: "Failed to delete items." });
  }
});

router.get("/removeCart/:pdid", async function (req, res) {
 console.log(req.user);
 
});

router.get("/decCart/:pdId", async function (req, res) {
  console.log(req.params.pdId);

  const productId = req.params.pdId;

  try {
    const product = await productModel.findById(productId);

    if (product) {
      console.log(product._id, product.name);
      if (product.quantity < 2) {
        product.quantity = 1;
      } else product.quantity = product.quantity - 1;
      await product.save();
      res.redirect("/cart");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/incCart/:pdId", async function (req, res) {
  console.log(req.params.pdId);

  const productId = req.params.pdId;

  try {
    const product = await productModel.findById(productId);

    if (product) {
      console.log(product._id, product.name);
      if (product.quantity >= 10) {
        product.quantity = 10;
      } else product.quantity = product.quantity + 1;
      await product.save();
      res.redirect("/cart");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
