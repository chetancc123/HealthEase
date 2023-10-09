let mongoose = require("mongoose");
mongoose.pluralize(null);

let salesmanSchema = mongoose.Schema({
    _id:Number,
    name:{type:String, required:[true,"required admin name"]},
    email:{type:String, required:[true,"required admin email"],unique:true},
    password:{type:String, required:[true,"create strong password!",]},
    gender:{type:String, required:true},
    age:{type:Number, required:true},
    mobileNo:{type:Number, required:true},
    address:{type:String},
});
let salesmanModel = mongoose.model("salesman",salesmanSchema)
module.exports=salesmanModel;