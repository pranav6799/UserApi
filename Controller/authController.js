const User = require("../Model/UserModel");
const jwt = require('jsonwebtoken')
const {
  promisify
} = require('util')



exports.protect = async (req,resp,next)=>{
  let token;
  if(req.headers.authorization || req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }


if(!token){
  return resp.status(400).json({
    msg:'User not logged in kindly login to access'
  })
}

const decode = await promisify(jwt.verify)(token,process.env.SECRET_KEY)

const currentUser = await User.findById(decode.id)

if(!currentUser){
  return resp.status(200).json({
    msg:'No user found with that id'
  })

 
}
req.user = currentUser


next()
}

exports.restrictTo = (...roles) =>{
  try{
    return (req,resp,next)=>{
      if(!roles.includes(req.user.role)) {
        return resp.status(400).json({
          msg:'Yo do not have a permission to access'
        })
      }
  
      next()
    }
  }catch(err){
    resp.status(500).json({
      msg:err.message
    })
  }
 
}

