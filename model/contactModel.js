const mongoose=require('mongoose')

const contactSchema=mongoose.Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true,
   },
   firstName:{
      type:String,
      required:[true,"please enter the first name"] 
   },
   lastName:{
    type:String,
    required:[true,"please enter the last name"] 
   },
   phone:{
      type:Number,
      required:[true,"please enter the phone number"] ,
      unique:true,
      // minlength: [10, ' minimum 10 numbers needed'],
      // maxlength:[10, ' number can't exceed 10'],
      min:[1000000000, ' minimum 10 numbers needed'],
       max:[9999999999, " number can't exceed 10"]
   },
   dateOfBirth:{
      type:String
   }
},{timestamps:true})
const contactModel=mongoose.model('contact',contactSchema)

module.exports=contactModel