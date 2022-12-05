const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var User = require("../models/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const {
  getGreeceTime,
  getGreeceTimeOneYear,
  getDoctor,
} = require("../helper/helperFunctions");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  //HANDLE BAR
  res.render("signup", {
    title: " Sign Up",
    signup: true,
  });
});

router.post("/", async (req, res) => {
  //console.log(req.body)
  let {
    fname,
    lname,
    email,
    password,
    role,
    streetName,
    streetNumber,
    streetZip,
    RepeatPassword,
    UserAmka,
  } = req.body;

  let Address = {
    streetName,
    streetNumber,
    streetZip,
  };
  var start_date = getGreeceTime();
  var Access_end_date = getGreeceTimeOneYear();

  if (password !== RepeatPassword) {
    res.render("signup", {
      title: " Sign Up",
      error: true,
      message: "Ο κωδικός και η επιβεβαίωση κωδικού δεν ταιρίαζουν.",
      status: "warning",
      signup: true,
    });
  } else {
    email = email.toLowerCase();
    User.find({ email })
      .exec()
      .then((user) => {
        console.log(user);
        if (user.length >= 1) {
          return res.render("signup", {
            title: "Sign Up",
            error: true,
            message: "User Exists",
            status: "warning",
            signup: true,
          });
        } else {
          bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
              return res.render("signup", {
                title: " Sign Up",
                error: true,
                message: err,
                status: "danger",
                signup: true,
              });
            } else {
              let doctor = {};
              if (role == "DOCTOR") {
                doctor.amka = UserAmka;
                doctor.name = fname + "_" + lname;
              } else if (role == "SECRETARY") {
                //secretary kanei o giatros mono

                doctor = await getDoctor(req);
                if (doctor === null) {
                  res.render("signup", {
                    title: " Sign Up",
                    error: true,
                    message: "Πρόβλημα στην καταχώρηση πρόσβασης δικαιωμάτων.",
                    status: "warning",
                    signup: true,
                  });
                  return;
                }
              }
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                fname,
                lname,
                email: email.toLowerCase(),
                password: hash,
                role,
                Address,
                start_date,
                UserAmka,
                doctor,
                Access_end_date,
              });

              user
                .save()
                .then((result) => {
                  res.render("signup", {
                    title: " Sign Up",
                    message: "User created! You can now login",
                    error: true,
                    status: "success",
                    signup: true,
                  });
                })
                .catch((err) => {
                  if (err.code === 11000) {
                    res.render("signup", {
                      title: " Sign Up",
                      message: "Βρέθηκε Χρήστης με αυτο το ΑΜΚΑ",
                      error: true,
                      status: "danger",
                      signup: true,
                    });
                  } else {
                    res.render("signup", {
                      title: " Sign Up",
                      message: err,
                      error: true,
                      status: "danger",
                      signup: true,
                    });
                  }

                  console.log(err);
                });
            }
          });
        }
      });
  }
});

module.exports = router;
