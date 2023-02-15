const express=require('express')
const {getContacts,createContact,updateContact,deleteContact}=require('../controllers/contactController')
const protect=require('../middleware/authMiddleware')

const router=express.Router()

router.get('/',protect,getContacts)
router.post('/',protect,createContact)
router.put('/:id',protect,updateContact)    
router.delete('/:id',protect,deleteContact)    


module.exports=router