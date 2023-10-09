let express=require("express");
let router=express.Router();
let orderController=require("../controller/orderController.js");
let authToken=require("../config/authToken.js");
//http://localhost:3000/api/order/addOrder
router.post("/addOrder",orderController.addOrder);

//http://localhost:3000/api/order/viewAllOrder
router.get("/viewAllOrder",authToken.verifyUserToken,orderController.viewAllOrder);

//http://localhost:3000/api/order/viewOrderByCustEmail
router.get("/viewOrderByCustEmail/:email",authToken.verifyUserToken,orderController.viewOrderByCustEmail);

//http://localhost:3000/api/order/viewOrderByCustName
//router.get("/viewOrderByCustName/:email",authToken.verifyUserToken,orderController.viewOrderByCustName);


// router.get("/viewOrderByCustId/:customerId",orderController.viewOrderByCustId);
module.exports=router;