let mongoose = require("mongoose");
mongoose.pluralize(null);

let customerSchema = mongoose.Schema({
    name:{type:String, required:[true,"required customer name"]},
    email:{type:String, required:[true,"required customer email"],unique:true},
    password:{type:String, required:[true,"create strong password!",]},
    gender:{type:String, required:true},
    age:{type:Number, required:true},
    mobileNo:{type:Number, required:true},
    address:{type:String},
    typeOfUser:{type:String, required:[true]}
});
let customerModel = mongoose.model("customer",customerSchema)
module.exports=customerModel;