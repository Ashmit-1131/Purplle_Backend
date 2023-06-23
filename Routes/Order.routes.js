const express = require("express")
const jwt = require("jsonwebtoken")
const { cartNorderValidator } = require("../Middlewares/Cart&orderValidator")
const { CartModel } = require("../Models/CartModel")
const { OrderModel } = require("../Models/OrderModel")
require("dotenv").config()

const orderRouter = express.Router()


orderRouter.get("/",(req,res)=>{
    let token = req.headers.authorization
    let page = req.query.page||0
    jwt.verify(token, process.env.SecretKey, async function(err, decoded) {
        if(err) res.send({
            message:"Something went wrong: "+err,
            status:0,
            error:true
        })
        let {userId:user} = decoded
        try {
            let count = await OrderModel.find({user}).countDocuments()
            let data = await OrderModel.find({user}).skip(page*5).limit(5)
            res.send({
                message:"All order data",
                status:1,
                count:count,
                data:data,
                error:false
            })
        } catch (error) {
            
            res.send({
                message:"Something went wrong: "+error.message,
                status:0,
                error:true
            })

        }
     
      });



})


orderRouter.patch("/:id",async(req,res)=>{
    let {id:_id} = req.params
    
        try {
            await OrderModel.updateOne({_id},req.body)
            res.send({
                message:"Status updated",
                status:1,
                error:false
            })           
    
        } catch (error) {
    
            res.send({
                message:"Something went wrong: "+error.message,
                status:0,
                error:true
            })
            
        }



  });



  

  orderRouter.post("/add", cartNorderValidator, async (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.SecretKey, async (err, decoded) => {
      if (err)
        res.send({
          message: "Invalid token: " + err,
          status: 0,
          error: true,
        });
  
      if (decoded) {
        await CartModel.deleteMany({ user: decoded.userId });
  
        try {
          if (Array.isArray(req.body)) { // Check if req.body is an array
            req.body.forEach((el) => {
              el.status = "ordered";
              el.orderDate = String(Date.now());
            });
            console.log(req.body);
            await OrderModel.insertMany(req.body);
  
            res.send({
              message: "Item added in order",
              status: 1,
              error: false,
            });
          } else {
            res.send({
              message: "Invalid request body: expected an array",
              status: 0,
              error: true,
            });
          }
        } catch (error) {
          res.send({
            message: "Something went wrong: " + error.message,
            status: 0,
            error: true,
          });
        }
      } else {
        res.send({
          message: "Invalid token",
          status: 0,
          error: true,
        });
      }
    });
  });
  
//  orderRouter.use(adminValidator)   


module.exports={
    orderRouter
}