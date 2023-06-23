const express = require("express");

const { ProductsModel } = require("../Models/ProductModel");

const productsRouter = express.Router();

productsRouter.use(express.json());

productsRouter.post("/add", async (req, res) => {
    const {image,name ,price, expire, category,discountPrice,createdAtsale,updatedAt,inStock} = req.body;
  try{
 
 
        let product=new ProductsModel({image,name ,price, expire, category,discountPrice,createdAtsale,updatedAt,inStock})
        await product.save()
        res.send({'msg':'Added Successfully!'})
      }
catch(err){
  res.send({'msg':err.message})
  }
  })

  productsRouter.get("/", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = 10;
      const skip = page * limit;
  
      const query = req.query;
      delete query.page;
  
      const count = await ProductsModel.countDocuments(query);
      const data = await ProductsModel.find(query).skip(skip).limit(limit);
  
      res.send({
        message: "All products data",
        count: count,
        status: 1,
        data: data,
        error: false,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong: " + error.message,
        status: 0,
        error: true,
      });
    }
  });
  
  productsRouter.get("/:id", async (req, res) => {
    let { id: _id } = req.params;
    try {
      let data = await ProductsModel.find({ _id });
      res.send({
        message: "All products data",
        status: 1,
        data: data,
        error: false,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong: " + error.message,
        status: 0,
        error: true,
      });
    }
  });

  productsRouter.patch("/:id", async (req, res) => {
    let { id: _id } = req.params;
  
    try {
      await ProductsModel.findByIdAndUpdate({ _id }, req.body);
      res.send({
        message: "Product updated",
        status: 1,
        error: false,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong: " + error.message,
        status: 0,
        error: true,
      });
    }
  });

  productsRouter.delete("/:id", async (req, res) => {
    let { id: _id } = req.params;
  
    try {
      await ProductsModel.findByIdAndDelete({ _id });
      res.send({
        message: "Product deleted",
        status: 1,
        error: false,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong: " + error.message,
        status: 0,
        error: true,
      });
    }
  });



  module.exports = {
    productsRouter,
  };