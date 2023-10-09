let jwt = require("jsonwebtoken");

let verifyUserToken = (request,res,next)=> {
    try{
    let token = request.headers.authorization;
    //console.log(token)
    if(token==undefined){
        res.json({
            "msg":"Unathorized request or user"
        })
    }else {
        let verifyToken = jwt.verify(token,"secretKey");
        console.log(verifyToken);
        next();
    }
}
    catch (err) {
        res.json({ msg: "Error generated:" + err });
      }
}

module.exports={verifyUserToken}