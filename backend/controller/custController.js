let custModel = require("../model/customerModel.js");
let categoryModel = require("../model/categoryModel.js");
let productModel = require("../model/productModel.js");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

// =======================================================================================================================================
//convert password in hash
let convertPasswordInHash = async (password) => {
  let salt = await bcrypt.genSalt(); // by default round 10
  let hashPassword = await bcrypt.hash(password, salt); // it will convert password in hash
  return hashPassword;
};

//compare hashpassword and password
let comparePasswordWithHash = async (password, hashPassword) => {
  let myHashConvertPassword = await bcrypt.compare(password, hashPassword);
  return myHashConvertPassword;
};

// =======================================================================================================================================

let signUp = async (req, res) => {
  let customer = req.body;
  //let emaildata = await custModel.find({ email: customer.email });
  if (customer.typeOfUser == "admin") {
    res.json({ msg: "You can not create Admin Account! Try again..." });
  } 
  else {
    try {
      
      customer.password = await convertPasswordInHash(customer.password);
      let result = await custModel.insertMany(customer);
      // console.log(result.email)
      if (result != null) {
        res.json({ msg: "Account created Successfully!" });

      } else {
        res.json({ msg: "Something went wrong.....Try Again!" });
      }
    } catch (err) {
      res.json({ msg: "Fill all the field or Check all field<br/> Email must be unique! Try again..."});

    }
  }
};
// =======================================================================================================================================
let signIn = async (req, res) => {
  let signin = req.body;
  try {
    let findUser = await custModel.findOne({ email: signin.email }); //find cust with email
    // console.log(findUser.name)
    if (findUser != null) {
      let result = await comparePasswordWithHash(
        signin.password,
        findUser.password
      );
      if (result) {
        let payload = { emailid: findUser.emailid };
        let tokenValue = jwt.sign(payload, "secretKey");
       
        if (findUser.typeOfUser == "admin" && signin.typeOfUser == "admin") {
          res.json({
            findUser,
            msg: "Admin successfully login!",
            token: tokenValue,
          });
          // res.json(findUser);
        } else if (
          findUser.typeOfUser == "customer" &&
          signin.typeOfUser == "customer"
        ) {
          res.json({
            findUser,
            msg: "Customer successfully login!",
            token: tokenValue,
          });
          // res.json(findUser);
        } else {
          res.json({ msg: "type of user may be wrong" });
        }
      } 
    
    else {
        res.json({ msg: "Password is wrong" });
      }
    } else {
      res.json({ msg: "EmailId is wrong" });
    }
  } catch (err) {
    res.json({ msg: "Error generated:" + err });
  }
};

// =======================================================================================================================================
let findCustomerByName = async (req, res) => {
  let custName = req.params.name;
    try {
      let result = await custModel.findOne({ name: custName });
      if (result == null) {
        res.json({ "msg": "Record not Found!" });
      }  else {
        res.json({"msg" : "Record Present!",customer:result});
      }
    } catch (err) {
      res.json({ msg: "Error generated " + err });
    }
  
};

// =======================================================================================================================================
let viewCategoryByName = async (req, res) => {
  let cname = req.params.Cname;
  try {
    let result = await categoryModel.findOne({ Cname: cname });
    if (result == null) {
      res.json({ "msg": "Record not Found!" });
    } else {
      res.json({"msg" : "Record Present!",category:result});
    }
  } catch (err) {
    res.json({ msg: "Error generated " + err });
  }
};

// =======================================================================================================================================
let findCustomerByEmail = async (req, res) => {
  let custEmail = req.params.email;
    try {
      let result = await custModel.findOne({ email: custEmail });
      if (result == null) {
        res.json({ "msg": "Record not Found!" });
      } else {
        res.json({"msg" : "Record Present!",customer:result});
      }
    } catch (err) {
      res.json({ msg: "Error generated " + err });
    }
  
};

// =======================================================================================================================================
let viewProductByName = async (req, res) => {
  let pname = req.params.pname;
  try {
    let result = await productModel.findOne({ pname: pname });
    if (result == null) {
      res.json({ "msg": "Record not Found!" });
    } else {
      res.json({"msg" : "Record Present!",product:result});
    }
  } catch (err) {
    res.json({ msg: "Error generated " + err });
  }
};

// =======================================================================================================================================
let viewProductByCategoryName = async (req, res) => {
  let cname = req.params.categoryName;
  try {
    let result = await productModel.findOne({ categoryName: cname });
    if (result == null) {
      res.json({ "msg": "Record not found!" });
    } else {
      res.json(result);
    }
  } catch (err) {
    res.json({ msg: "Error generated " + err });
  }
};
// =======================================================================================================================================
let deleteCustAccount=async (req,res)=>{
  let cemail =req.params.email;
  let result = await custModel.deleteOne({email:cemail})
        //response.json(result);
        if(result.deletedCount>0){
            res.send("Account deleted successfully")
        }else {
            res.send("Account not present")
        }
}
module.exports = {
  convertPasswordInHash,
  comparePasswordWithHash,
  signUp,
  signIn,
  findCustomerByName,
  findCustomerByEmail,
  viewCategoryByName,
  viewProductByName,
  viewProductByCategoryName,
  deleteCustAccount
};
