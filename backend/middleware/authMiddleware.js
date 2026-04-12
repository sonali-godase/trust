const admin = require("../config/firebaseAdmin");

module.exports = async(req,res,next)=>{

try{

const token = req.headers.authorization;

const decoded = await admin.auth().verifyIdToken(token);

req.user = decoded;

next();

}catch(err){

res.status(401).json("Unauthorized");

}

}