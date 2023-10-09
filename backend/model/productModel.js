let mongoose = require("mongoose");
mongoose.pluralize(null);

let productSchema=mongoose.Schema({
    _id:Number,
    pname:{type:String, required:true},
    price:{type:Number, required:true},
    quantity:{type:Number,required:true},
    cid:{type:Number, required:true},
    categoryName:{type:String,required:true}
})
let addProduct=mongoose.model("product",productSchema);
module.exports=addProduct;