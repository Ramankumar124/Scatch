const express = require("express");
const productModel = require("../models/productModel");
const router = express.Router();

const upload = require("../config/multerConfig");
const ownerModel = require("../models/ownerModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const { isLogin } = require("../middlewares/isLogin");
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

router.get("/removeCart/:pdid",isLogin ,async function (req, res) {
  console.log(req.user);
  const productId = req.params.pdid;
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const prodductIndex=user.cart.findIndex(cartItem=>cartItem.product.equals(productObjectId));
     
  user.cart.splice(prodductIndex,1);
  await user.save();
  res.redirect("/cart");
  } catch (error) {
    res.send(error.message);

  }
// or good method 
// const productId = req.params.pdid;

// try {
//   // Convert the product ID from the URL into a MongoDB ObjectId
//   const productObjectId = new mongoose.Types.ObjectId(productId);

//   // Update the user document to remove the item from the cart
//   await userModel.updateOne(
//     { email: req.user.email }, // Find the user by email
//     { $pull: { cart: { product: productObjectId } } } // Remove item from cart array
//   );

//   // Redirect to the cart page or send a response
//   res.redirect("/cart");
// } catch (error) {
//   // Handle any errors that occur
//   res.send(error.message);
// }
});

router.get("/decCart/:pdId", isLogin, async function (req, res) {
  console.log("Id from get request", req.params.pdId);
  console.log(req.user);

  const productId = req.params.pdId;

  try {
    const user = await userModel.findOne({ email: req.user.email });

    // Convert productId to a Mongoose ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    const productIndex = user.cart.findIndex((cartItem) =>
      cartItem.product.equals(productObjectId)
    );

    console.log("Product Index", productIndex);

    const product = user.cart[productIndex];
    console.log(product);

    if (product) {
      if (product.quantity < 2) {
        product.quantity = 1;
      } else {
        product.quantity = product.quantity - 1;
      }
      await user.save();
      res.redirect("/cart");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/incCart/:pdId", isLogin, async function (req, res) {
  console.log("Id from get request", req.params.pdId);
  console.log(req.user);

  const productId = req.params.pdId;

  try {
    const user = await userModel.findOne({ email: req.user.email });

    // Convert productId to a Mongoose ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    const productIndex = user.cart.findIndex((cartItem) =>
      cartItem.product.equals(productObjectId)
    );

    console.log("Product Index", productIndex);

    const product = user.cart[productIndex];
    if (product) {
      product.quantity = product.quantity + 1;

      await user.save();
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
