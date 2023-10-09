let categoryModel = require("../model/categoryModel.js");
let customerModel = require("../model/customerModel.js");
let productModel = require("../model/productModel.js");
let salesmanModel=require("../model/salesmanModel.js");
let jwt = require("jsonwebtoken");


// =======================================================================================================================================
let addCategory = async (req, res) => {
  let category = req.body;
  try {
    let result = await categoryModel.insertMany(category);
    if (result != null) {
      res.json({ msg: "catogory added Successfully!" });
    } else {
      res.json({ msg: "Something went wrong.....Try Again!" });
    }
  } catch (err) {
    res.json({ msg: "Check All field correctly" });
  }
};
//==========================================================================================================================================

let addProduct = async (req, res) => {
  let products = req.body;
  try {
    let result = await productModel.insertMany(products);
    if (result != null) {
      res.json({ msg: "Product added Successfully!" });
    } else {
      res.json({ msg: "Something went wrong.....Try Again!" });
    }
  } catch (err) {
    res.json({ msg: "Check All field correctly" });
  }
};
// =========================================================================================================================================

let viewAllCategory = async (req, res) => {
  try {
    let result = await categoryModel.find({});
    let msg = JSON.stringify(result);
    res.send(msg);
  } catch (error) {
    res.json(error);
  }
};
//=========================================================================================================================================

let viewAllProduct = async (req, res) => {
  try {
    let result = await productModel.find({});
    let msg = JSON.stringify(result);
    res.send(msg);
  } catch (error) {
    res.json(error);
  }
};

// =======================================================================================================================================
let findAllCustomers = async (req, res) => {
  try {
    let result = await customerModel.find({},{password:0});
    // if()
    res.send(result);
  } catch (error) {
      res.json(error);
  }
};

// =======================================================================================================================================
//Add salesman
let addSalesman= async(req,res)=>{
  let salesman = req.body;
  try {
    function generatePassword() {
      var newPssword = '';
      var str =(salesman.email)+
              'ABCDEFGHIJKLMNOPQRTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
      for (let i = 1; i <= 15; i++) {
          var char = Math.floor(Math.random() * str.length + 1);
          newPssword += str.charAt(char)
      }
      return newPssword;
    }
    // var salesmanpassword=(generatePassword());
    // var result = await salesmanModel.insertMany(salesman)+({"password":salesmanpassword})
    salesman.password=(generatePassword())
    var result = await salesmanModel.insertMany(salesman);
    if (result != null) {
      res.json({ msg: "salesman added Successfully!" });
    } else {
      res.json({ msg: "Something went wrong.....Try Again!" });
    }
  } catch (err) {
    res.json({ msg: "Check All field correctly" });
  }
}
// =======================================================================================================================================
//View All Salesman
let viewAllSalesman=async (req, res) => {
  try {
    let result = await salesmanModel.find({});
    res.send(result);
  } catch (error) {
    res.json(error);
  }
};
// =======================================================================================================================================
let viewSalesmanByName=async (req,res)=>{
  let salesmanName = req.params.name;
  try {
    let result = await salesmanModel.findOne({ name: salesmanName });
    if (result == null) {
      res.json({ "msg": "Record not Found!" });
    } else {
      res.json({"msg": "Record Present!",salesman:result});
    }
  } catch (err) {
    res.json({ msg: "Error generated " + err });
  }
}
module.exports = {
  addCategory,
  addProduct,
  viewAllCategory,
  viewAllProduct,
  findAllCustomers,
  addSalesman,
  viewAllSalesman,
  viewSalesmanByName
};
