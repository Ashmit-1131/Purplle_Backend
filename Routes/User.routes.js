const express = require("express");

const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/UserModel");
const { userValidator } = require("../Middlewares/UserValidator");
const jwt = require("jsonwebtoken");


UserRouter.post("/register", userValidator, async (req, res) => {
    let { email, Fname, Lname, password, phone } = req.body;
  
    if (email && password) {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err)
          res.send({
            message: "Something went wrong: " + err,
            status: 0,
            error: true,
          });
  
        try {
          let user = new UserModel({ email, Fname, Lname, password: hash,phone });
          await user.save();
          res.send({
            message: "User is regsitered",
            status: 1,
            error: false,
          });
        } catch (error) {
          res.send({
            message: "Somthing went wrong" + error.message,
            status: 0,
            error: true,
          });
        }
      });
    } else {
      try {
        let user = new UserModel({ Fname, Lname, phone });
        await user.save();
        res.send({
          message: "User is regsitered",
          status: 1,
          error: false,
        });
      } catch (error) {
        res.send({
          message: "Somthing went wrong" + err,
          status: 0,
          error: true,
        });
      }
    }
  });

  UserRouter.post("/login",async (req, res) => {
    let { email, password } = req.body;
    if (email && password) {
      try {
        let data = await UserModel.find({ email });
        if (data.length > 0) {
          bcrypt.compare(password, data[0].password, (err, result) => {
            if (err)
              res.send({
                message: "Something went wrong",
                status: 0,
                error: true,
              });
  
            if (result) {
              let token = jwt.sign(
                { userId: data[0]._id, role: data[0].role },
                process.env.SecretKey
              );
              res.send({
                message: "Login successful",
                status: 1,
                Fname:data[0].Fname,
                Lname:data[0].Lname,
                email:data[0].email,
                phone:data[0].phone,
               
                token: token,
                error: false,
              });
            } else {
              res.send({
                message: "Password is incorrect",
                status: 0,
                error: true,
              });
            }
          });
        } else {
          res.send({
            message: "User does not exist , Please Sign up",
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
      //for phone
    }
  });

  module.exports = {
    UserRouter
  };