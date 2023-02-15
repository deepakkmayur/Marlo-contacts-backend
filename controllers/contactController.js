const Contact=require('../model/contactModel')
const asyncHandler=require("express-async-handler")
const User=require('../model/userModel')



const getContacts=asyncHandler(async(req,res)=>{
  const data=await Contact.find({user:req.user._id})
  if(data.length!=0){
    res.status(200).json(data)
  }else{
    res.status(400)
    throw new Error("no Contacts found")
  }
})


//create a contact

const createContact=asyncHandler(async (req,res)=>{   
  
  const {firstName,lastName,phone,dateOfBirth}=req.body 
  if(firstName&&lastName&&phone&&dateOfBirth){
    const contactData= await Contact.create({firstName,lastName,phone,dateOfBirth,user:req.user._id})   
    if(contactData){
      res.status(201).json(contactData)   
    }else{
      res.status(500)
      throw new Error("error in Contact creation")
    }
  }else{
    res.status(400)
    throw new Error("enter the data properly")
  }
})


//update a contact

const updateContact=asyncHandler(async (req,res)=>{
  const contact=await Contact.findById({_id:req.params.id})
  if(contact){
        const user=await User.findById({_id:req.user.id})
        //checking contact user ID and User ID is same
        if(contact.user.toString()===user._id.toString()){
          const newData=await Contact.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
          res.status(201).json({message:"updated",newData})
        }else{
          res.status(401)
          throw new Error("user id not matching")   
        }
  }else{
     res.status(400).json("no contact found")    
  }    
})



//delete a contact

const deleteContact=asyncHandler(async(req,res)=>{
 const contact=await Contact.findById({_id:req.params.id})
  if(contact){
    const user=await User.findById({_id:req.user._id})
    //make sure logged user id matches with contact user id
    if(user._id.toString()===contact.user.toString()){
      await Contact.findById({_id:req.params.id}).deleteOne()
      res.status(200).json({message:"contact deleted"})
    }else{
      res.status(401)
      throw new Error("not authorized")
    }
  }else{
    res.status(400)
     throw new Error("no contact found")
  }
 })


module.exports={getContacts,createContact,updateContact,deleteContact}