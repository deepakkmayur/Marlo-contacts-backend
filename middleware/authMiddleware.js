const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User=require('../model/userModel')

const protect=asyncHandler(async(req,res,next)=>{
   
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
     
      try {
         //getting token form header
         let token= req.headers.authorization.split(' ')[1]

         //decoding and verifying token
         let decodedToken=jwt.verify(token,process.env.JWT_SECRET)
         //get user from token 
         req.user=await User.findById(decodedToken.id).select('-password') 
          next()
    
       } catch (error) {
         console.log(error); 
         res.status(401)
        throw new Error("not auithorized") 
       }

   }else{
      res.status(401)
      throw new Error("not authorized,no token")
   }
   
   })


module.exports=protect