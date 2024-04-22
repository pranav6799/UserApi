const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const connectDb = require('./connectDb')
const userRouter = require('./Routes/userRoutes')
const errorController = require('./Controller/errorController')
app.use(express.json())




const port = process.env.PORT || 3001
connectDb()

app.use('/api/v1/user',userRouter)
app.use(errorController)



const server = app.listen(port, ()=>{
  console.log(`Server running on port ${port} `)
})


