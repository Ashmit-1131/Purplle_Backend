const express = require("express");
const jwt = require("jsonwebtoken");
const { cartNorderValidator } = require("../Middlewares/Cart&orderValidator");
const { CartModel } = require("../Models/CartModel");
const cartRouter = express.Router();
require("dotenv").config();

cartRouter.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const page = req.query.page || 0;
    const decoded = jwt.verify(token, process.env.SecretKey);
    const { userId: user } = decoded;

    const count = await CartModel.countDocuments({ user });
    const data = await CartModel.find({ user }).skip(page * 5).limit(5);

    res.send({
      message: "All cart data",
      status: 1,
      count: count,
      data: data,
      error: false,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

cartRouter.get("/:pid", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { pid } = req.params;
    const decoded = jwt.verify(token, process.env.SecretKey);
    const { userId: user } = decoded;

    const data = await CartModel.find({ user, pid });

    if (data.length > 0) {
      res.send({
        message: "Item already in cart",
        status: 1,
        error: false,
      });
    } else {
      res.send({
        message: "Item not present in cart",
        status: 0,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

cartRouter.patch("/:id", async (req, res) => {
  try {
    const { id: _id } = req.params;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SecretKey);
    const { userId: user } = decoded;

    await CartModel.updateOne({ _id, user }, req.body);

    res.send({
      message: "Item updated",
      status: 1,
      error: false,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

cartRouter.delete("/:id", async (req, res) => {
  try {
    const { id: _id } = req.params;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SecretKey);
    const { userId: user } = decoded;

    await CartModel.deleteOne({ _id, user });

    res.send({
      message: "Item deleted",
      status: 1,
      error: false,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

cartRouter.use(cartNorderValidator);

cartRouter.post("/add", async (req, res) => {
  try {
    await CartModel.insertMany(req.body);
    res.send({
        message: "Item added in cart",
        status: 1,
        error: false,
      });
    } catch (error) {
        res.status(500).send({
        message: "Something went wrong: " + error.message,
        status: 0,
        error: true,
        });
        }
        });
        
        module.exports = {
        cartRouter,
        }