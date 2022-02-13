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

// express app
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

/////  global variables
const auth = getAuth();
const db = getFirestore();
let user = null;

//////    POST METHOD

app.post("/initsignup", function (req, res) {
  if (req.body.position === "Employee") {
    res.render("emp_Sign-up");
  } else {
    res.render("Sign-up");
  }
});
// Manager Signup
app.post("/msignup", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  if (password != cpassword) {
    res.render("Sign-up", {});
  }
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

      var tid = req.body.tid;

      var mid = req.body.mid;

      var address = req.body.address;

      try {
        setDoc(doc(db, "Manager", email), {
          fname: fname,
          lname: lname,
          bday: bday,
          gen: gen,
          call: call,
          tid: tid,
          mid: mid,
          email: email,
          address: address,
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

// Employee Signup
app.post("/esignup", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  if (password != cpassword) {
    res.send(1, "showAlert");
  }
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

      var tid = req.body.tid;

      var gid = req.body.gid;

      var address = req.body.address;

      var eid = req.body.eid;
      var nation = req.body.nation;

      var spcl = req.body.spcl;

      var branch = req.body.branch;
      var state = req.body.state;
      var nation = req.body.nation;
      try {
        setDoc(doc(db, "Employee", eid), {
          fname: fname,
          lname: lname,
          bday: bday,
          gen: gen,
          call: call,
          tid: tid,
          gid: gid,
          eid: eid,
          nation: nation,
          spcl: spcl,
          branch: branch,
          state: state,
          email: email,
          address: address,
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
      console.log(errorMessage);
      // ..
    });
});
// Redirecting to Login Page from signup page
app.post("/tologin", function (req, res) {
  res.render("login", {});
});

// Login
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

// Logout
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

// Post Profile
app.post("/profile", function (req, res) {
  res.render("editprofile", {});
});

// GET Methods
// index
app.get("/", function (req, res) {
  res.render("index", {});
});

//signup
app.get("/signup", function (req, res) {
  res.render("initsignup", {});
});

//  manager signup
app.get("/msignup", function (req, res) {
  res.render("Sign-up", {});
});

// emp signup

app.get("/esignup", function (req, res) {
  res.render("emp_Sign-up", {});
});

// login
app.get("/login", function (req, res) {
  res.render("login", {});
});

//editprofile
app.get("/editprofile", function (req, res) {
  res.render("editprofile", {});
});

// get profile
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

////       Port 3000
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
