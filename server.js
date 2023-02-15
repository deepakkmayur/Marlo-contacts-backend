const express=require('express')
const dotenv=require("dotenv").config()
const connectDB=require('./config/db')

const contactRoute =require('./routes/contactRoute')
const userRoute=require('./routes/userRoute')   
const errorHndler=require('./middleware/errorMiddleware')  

const app=express()
const port=process.env.PORT
connectDB()


//application middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use('/contact',contactRoute)
app.use('/user',userRoute)



//error middleware
app.use(errorHndler)

   

app.listen(port,()=>console.log(`server running on port ${port}`))

