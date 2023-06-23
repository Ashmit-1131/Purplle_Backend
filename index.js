const express = require("express")
const { connection } = require("./db")
const cors =require("cors")
const { UserRouter } = require("./Routes/User.routes")
const {productsRouter}=require("./Routes/Product.routes")
const {cartRouter}=require("./Routes/Cart.routes")
const {orderRouter}=require("./Routes/Order.routes")
const { authenticator } = require("./Middlewares/authenticator")
const { searchRouter } = require("./Routes/Search.routes")

require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.send({
        message:"Api is running",
        status:0,
        error:false
    })
})

//user route


app.use("/user",UserRouter)
app.use("/product",productsRouter)
app.use("/search",searchRouter)
app.use(authenticator)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)









app.listen(process.env.PORT,async()=>{

    try {
        
        await connection
        console.log("Connected to DB")

    } catch (error) {
        console.log(error)
        
    }


    console.log("Server is running on port number",process.env.PORT)
})