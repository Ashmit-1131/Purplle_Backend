const express = require("express");
const searchRouter = express.Router();
const { ProductsModel } = require('../Models/ProductModel');
require('dotenv').config();

searchRouter.get('/item',(req,res)=>{
    res.send([])
})

searchRouter.get('/item/:key',async(req,res)=>{

  let data = await ProductsModel.find(
    {
      "$or":[
        {name:{$regex:new RegExp(`${req.params.key}`, `i`)}},
        {category:{$regex:new RegExp(`${req.params.key}`, `i`)}},
        {expire:{$regex:new RegExp(`${req.params.key}`, `i`)}},
        {createdAt:{$regex:new RegExp(`${req.params.key}`, `i`)}}
      ]
    }
  )
  res.send(data)
})

module.exports = {
    searchRouter
}