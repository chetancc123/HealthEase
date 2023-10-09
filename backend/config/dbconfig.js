let mongoose = require("mongoose");
let url = "mongodb://127.0.0.1:27017/projectdb"; //it contains url details with database name
mongoose.set("strictQuery", true); //for handling err on mongoose
let custModel = require("../model/customerModel");
let custController=require("../controller/custController")

let dbConnection = mongoose
  .connect(url)
  .then((res) => console.log("Database connected!"))
  .catch((err) => console.log("error generated: " + err));

//Add admin account
let addAdmin = async (req, res) => {
  try {
    let admin = {
      name: "Rohit Sharma",
      email: "admin@gmail.com",
      password: "admin1",
      gender: "M",
      age: 30,
      mobileNo: "1234567890",
      address: "Mumbai",
      typeOfUser: "admin",
    };
    
    let value = await custModel.findOne({ typeOfUser: admin.typeOfUser });
    if (value == null) {
      admin.password= await custController.convertPasswordInHash(admin.password)
      custModel.insertMany(admin);
      console.log("Admin added successfuly!");
    } 
    // else {
    //   // console.log(admin.name);
    //   console.log("Admin already exists!");
    // }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { dbConnection, addAdmin };
