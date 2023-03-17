//jshint esversion:6
require('dotenv').config();
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const _ =require("lodash");

const app=express();
//mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
mongoose.set('strictQuery', true);
//mongoose connection to mongodb
const uri=process.env.MONGODB_CONNECTION;
mongoose.connect(uri, {useNewUrlParser:true});


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});



app.set("view engine" ,'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// const event = new Date();
// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

// const day=event.toLocaleDateString("en-US",options);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileno: { type: Number, required: true },
  message: { type: String, required: true },
}, {
  timestamps: true,
});

const User=mongoose.model("User",userSchema);

app.get("/",function(req,res){
   res.render('home')
});
    
app.get("/about",function(req,res){
    res.render('about');
});
app.get("/feed",function(req,res){
    res.render('feed');
});
app.get("/form",function(req,res){
    res.render('form');
});
app.get("/contact",function(req,res){
    res.render('contact');
});
app.get("/login",function(req,res){
    res.render('contact');
});
// to create a blog
app.post("/form",function(req,res){
  
   const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        mobileno:req.body.mobileno,
        message:req.body.message
    });
    newUser.save(function(err){
        if(!err){
            console.log("successfully submitted");
            res.render('post');

        }
    });
  
});

        


let port=process.env.PORT ||3000 || 8000 || 8080 ;
app.listen(port,function(req,res){
    console.log('port server is'+port);
});