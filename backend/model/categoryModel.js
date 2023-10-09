let mongoose = require("mongoose");
mongoose.pluralize(null);

let categorySchema=mongoose.Schema({
    _id:Number,
    Cname:{type:String, required:true},
})
let addCategryModel=mongoose.model("Category",categorySchema);


module.exports=addCategryModel;