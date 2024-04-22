const mongoose = require('mongoose')
const express = require('express')


const Db = process.env.DATABASE_URL

const connectDb = async()=>{
  await mongoose.connect(Db,{
  useUnifiedTopology: true,
  useNewUrlParser: true,
  })
  console.log('DB Connected Successfully')
}


module.exports=connectDb