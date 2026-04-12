const User = require("../models/User");

exports.register = async(req,res)=>{

try{

const {mobile,name,email} = req.body;

let user = await User.findOne({mobile});

if(!user){

user = new User({
mobile,
name,
email
});

await user.save();

}

res.json(user);

}catch(err){

res.status(500).json(err);

}

};