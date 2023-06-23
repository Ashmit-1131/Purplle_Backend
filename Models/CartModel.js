const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    image:{type:String},
    name:{type:String},
    expire:{type:String},
    price:{type:Number},
    discountPrice:{type:Number},
    category:{type:String},
    createdAt:{type:String},
    updatedAt:{type:String},
    inStock:{type:String},
    user: { type: String },
    quantity: { type: Number, required: true },
     pid: { type: String },
  },
  {
    versionKey: false,
  }
);

const CartModel = mongoose.model("/cart", cartSchema);

module.exports = {
  CartModel,
};