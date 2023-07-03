const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('./public'))
app.use(cors())

app.get('/',(req,res)=>{
    res.json({message:'Everything is working fine'})
})

const User = mongoose.model('User',{
  first_name:String,
  last_name:String,
  email:String,
  avatar:String

})

app.get('/user',(req,res)=>{
    User.find().then((user)=> res.json(user))
    .catch((err)=> res.json({Status:'Failled',message:'Something Went Wrong'}))
})

app.post('/user',(req,res)=>{
  const {first_name,last_name,email,avatar} = req.body
  User.create({first_name,last_name,email,avatar})
    .then(()=>res.json({status:'Success',message:'Usre Added Successfully'}))
    .catch((err)=> res.json({Status:'Failled',message:'Something Went Wrong'}))
})
app.listen(process.env.PORT,(req,res)=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('sever running on http://localhos:${process.env.PORT}')
    })
    .catch(err => console.log(err))
});