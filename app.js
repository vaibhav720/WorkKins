//Firebase Configuration

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import express from "express";
import bodyParser from "body-parser";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

import ejs from "ejs";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXl0dia4GIpcMpkIjDjs_2p-LvRy8GXdg",
  authDomain: "workkins.firebaseapp.com",
  projectId: "workkins",
  storageBucket: "workkins.appspot.com",
  messagingSenderId: "377332826403",
  appId: "1:377332826403:web:456be74ac831046cc34c96",
  measurementId: "G-4ZVDSG4B18",
};

// Initialize Firebase
const fireapp = initializeApp(firebaseConfig);

//jshint esversion:6

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

/////  global variables
const auth = getAuth();
const db = getFirestore();
let user = null;

//////    POST METHOD

//                                             Sign UP
app.post("/signup", function (req, res) {
  if(req.body.register==="Login")
  {
    res.render("login", {});
  }
  var email = req.body.email;
  var password = req.body.password;

  console.log("Till password");

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      user = userCredential.user;

      var fname = req.body.fname;

      var lname = req.body.lname;

      var bday = req.body.bday;

      var gen = req.body.gen;

      var call = req.body.call;

      var branch = req.body.branch;

      var mid = req.body.mid;

      var cpassword = req.body.cpassword;
      try {
        setDoc(doc(db, "Manager", email), {
          fname: fname,
          lname: lname,
          bday: bday,
          gen: gen,
          call: call,
          branch: branch,
          mid: mid,
          email: email,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      res.render("index", {});

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //   console.log(errorMessage);
      // ..
    });
});


app.post("/tologin",function(req,res){
  res.render("login",{});
});

//                                              post login
app.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  console.log("Till password");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      console.log("Logged in");
      res.render("index", {});
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});
//                                             post logout
app.post("/logout", function (req, res) {
  signOut(auth)
    .then(() => {
      user = null;

      res.render("login", {});
    })
    .catch((error) => {
      res.render("index", {});
    });
});
//                                           post profile
app.post("/profile",function(req,res){
  res.render("editprofile",{});
});

////                                          GET METHODS
//                                            get index
app.get("/", function (req, res) {
  res.render("index", {});
});

app.get("/signup", function (req, res) {
  res.render("Sign-up", {});
});

app.get("/login", function (req, res) {
  res.render("login", {});
});


app.get("/editprofile", function (req, res) {
  res.render("editprofile", {});
});

app.get("/profile", async function (req, res) {
  if (user) {
    const email = user.email;

    const manager = doc(db, "Manager", email);
    const mansnap = await getDoc(manager);

    if (mansnap.exists()) {
      console.log(mansnap.data());
      res.render("profile", { manager: mansnap.data() });
    } else {
      res.render("Sign-up", {});
    }
  } else {
    res.render("Sign-up", {});
  }
});

////       Port 300000
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
