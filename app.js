//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



/////  global variables



//////    POST METHOD






////   GET METHODS

app.get("/",function(req,res){
    res.render("index",{});
});


app.get("/signup",function(req,res){
    res.render("Sign-up",{});
});

app.get("/login",function(req,res){
    res.render("login",{});
});

app.get("/profile",function(req,res){
    res.render("profile",{});
});



////       Port 300000
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });