//jshint esversion:6
require('dotenv').config();
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const _ =require("lodash");
// const bcrypt=require("bcrypt");
// const saltRounds=10;

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
  firstname: { type: String, required: true },
  lastname:{ type: String, required:  true },
  email:{ type: String, required:  true },
  mobileno:{ type: Number, required:true ,min: [7, 'Must be at least 7, got {VALUE}']},
  college:{ type: String, required: true },
  message:{ type: String, required:true,min: [1, 'Must be at least 1, got {VALUE}'] }
}, {
  timestamps: true,
});


// eggs: {
//     type: Number,
//     min: [6, 'Must be at least 6, got {VALUE}'],
//     max: 12
//   },
//   drink: {
//     type: String,
//     enum: {
//       values: ['Coffee', 'Tea'],
//       message: '{VALUE} is not supported'
//     }

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
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        mobileno:req.body.mobileno,
        message:req.body.message,
        college:req.body.college
    });
    newUser.save(function(err){
        if(!err){
            console.log("successfully submitted");
            res.render('post',{keyforerr:"Form has been successfully submitted!",err:"Thank you"});
        }
        else{
            console.log(err);
            res.render('post',{keyforerr:"check the form again! invalid input",err:err});
        }
    });
  
});


        






let port=process.env.PORT ||3000 || 8000 || 8080 ;
app.listen(port,function(req,res){
    console.log('port server is'+port);
});


// //schema for model/collection/table created
// const loginSchema=new mongoose.Schema({
//     email:String,
//     password:String
// });



// const Login=new mongoose.model("Login",loginSchema);


// app.get("/homesecret",function(req,res){
//     res.render("secret");
// });
// app.get("/login",function(req,res){
//     res.render("login");
// });
// app.get("/logout",function(req,res){
//     res.redirect("/");
// });

// app.post("/login",function(req,res){
//    const email=req.body.username;
//    const password=req.body.password;
//     Login.findOne({email:email},function(err,foundedUser){
//         if(err){
//             console.log(err);}
//         else{
//             if(foundedUser){
//                 bcrypt.compare(password ,foundedUser.password,function(err,result){
//                  if(result===true){
//                      res.render("secrets");
//                  }
//                  });
//              }  
//         }
//     });
// });
// // this is register part
// app.get("/register",function(req,res){
//     res.render("register");
// });

// app.post("/register",function(req,res){
//     const registeredPassword=req.body.password ;
//     bcrypt.hash(registeredPassword, saltRounds ,function(err,hash){
//         const newLogin = new Login({
//             email:req.body.username,
//             password:hash
//          });
         
//       newLogin.save(function(err){
//         if(err){
//             console.log(err);
//         }
//         else{
//          console.log(md5("123456"));
//             res.render("secrets")
//         }
//      })
//     });
   
// });
// app.get("/submit",function(req,res){
//     res.render("submit");
// });

