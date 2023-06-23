const mongoose = require("mongoose")


const productsSchema= mongoose.Schema({
image:{type:String},
name:{type:String},
expire:{type:String},
price:{type:Number},
discountPrice:{type:Number},
category:{type:String},
createdAt:{type:String},
updatedAt:{type:String},
inStock:{type:String}
},{
    versionKey:false
})


const ProductsModel = mongoose.model("/product",productsSchema)

module.exports={
    ProductsModel
}