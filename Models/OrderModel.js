const mongoose = require("mongoose")


const orderSchema = mongoose.Schema({
    image:{type:String},
    name:{type:String},
    expire:{type:String},
    price:{type:Number},
    discountPrice:{type:Number},
    category:{type:String},
    createdAt:{type:String},
    updatedAt:{type:String},
    inStock:{type:String},
    quantity:{type:Number,required:true},
    user:{type:String,required:true},
    status:{type:String,required:true},
    orderDate:{type:String,required:true},
    address:{type:String,required:true},
    pid:{type:String},
  totalDiscountPrice:{type:Number,required:true}

    

},{
    versionKey:false
})


const OrderModel = mongoose.model("/order",orderSchema)

module.exports={
    OrderModel
}


