const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const { comment } = require('postcss');
const port = 3019

const app = express();

app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

    mongoose.connect('mongodb://127.0.0.1:27017/comments')
    const db = mongoose.connection
    db.once('open',()=>{
        console.log("Mongodb connection successful")
    })

   

   const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    comment:String
   }) 

    const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))

})

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio.html'));
});



app.post('/post',async(req,res)=>{
    const{name,email,comment} = req.body
 const user = new Users({
    name,
    email,
    comment
 })
 await user.save()
    console.log(user)
    res.send("Submission Successfully Done")

})

app.listen(port,()=>{
    console.log("Server started")
})

