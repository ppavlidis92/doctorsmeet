const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const async = require("hbs/lib/async");
const verifyToken = require("../helper/validate-token");
var User = require("../models/users");
const bcrypt = require("bcrypt");

const {
  getGreeceTime,
  getGreeceTimeOneYear,
  getDoctor,
} = require("../helper/helperFunctions");

router.use(bodyParser.urlencoded({ extended: true }));

/*
ROUTE THAT SERVES PAGE AddUser
*/
router.get("/AddUser", verifyToken, async (req, res) => {
  res.render("AddUser", {
    title: "Εισαγωγή Χρήστη",
  });
});

/*
ROUTE THAT SAVES A SECRETARY
DOCTOR IS CREATED BY ADMIN
*/
router.post("/AddUser", verifyToken, async (req, res) => {
  let {
    fname,
    lname,
    age,
    UserAmka,
    email,
    password,
    mobile_number,
    streetName,
    streetNumber,
    streetZip,
    RepeatPassword,
  } = req.body;

  let Address = {
    streetName,
    streetNumber,
    streetZip,
  };
  var start_date = getGreeceTime();
  var Access_end_date = getGreeceTimeOneYear();

  let role = "SECRETARY";

  if (password !== RepeatPassword) {
    res.render("AddUser", {
      title: "Εισαγωγή Χρήστη",
      error: true,
      message: "Ο κωδικός και η επιβεβαίωση κωδικού δεν ταιρίαζουν.",
      status: "warning",
    });
    return;
  } else {
    email = email.toLowerCase();
    let user = User.find({ email }, async (err, user) => {
      if (err) {
        res.render("AddUser", {
          title: "Εισαγωγή Χρήστη",
          error: true,
          message: "Βρεθηκε χρήστης με αυτό το email.",
          status: "warning",
        });
        return;
      }

      if (user.length >= 1) {
        res.render("AddUser", {
          title: "Εισαγωγή Χρήστη",
          error: true,
          message: "Βρεθηκε χρήστης με αυτό το email.",
          status: "warning",
        });
        return;
      } else {
        let doctor = {};
        let help;

        //secretary kanei o giatros mono

        //give the new user doctor amka
        help = getDoctor(req);
        doctor.amka = help;

        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            res.render("AddUser", {
              title: "Εισαγωγή Χρήστη",
              error: true,
              message: err,
              status: "warning",
            });
            return;
          } else {
            if (doctor === null) {
              res.render("AddUser", {
                title: "Εισαγωγή Χρήστη",
                error: true,
                message: "Πρόβλημα στην καταχώρηση πρόσβασης δικαιωμάτων",
                status: "warning",
              });
              return;
            }

            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              fname,
              lname,
              email: email.toLowerCase(),
              age,
              password: hash,
              role,
              Address,
              start_date,
              UserAmka,
              doctor,
              Access_end_date,
              start_date,
              Access_end_date,
              mobile_number,
            });

            await user
              .save()
              .then((result) => {
                res.render("AddUser", {
                  title: "Εισαγωγή Χρήστη",
                  error: true,
                  message: "Επιτυχής Καταχώρηση Χρήστη",
                  status: "success",
                });
              })
              .catch((err) => {
                console.log(err);
                res.render("AddUser", {
                  title: "Εισαγωγή Χρήστη",
                  error: true,
                  message: err,
                  status: "warning",
                });
              });
          }
        });
      }
    });
  }
});
//
/*
ROUTE THAT RETURNS ALL USERS
*/
router.get("/UsersList", verifyToken, async (req, res) => {
  const users = await User.find({ role: { $ne: "ADMIN" } }).exec(
    (err, users) => {
      if (err) {
        res.render("UsersList", {
          title: "Λίστα Χρηστών",
          error: true,
          message: err.message,
          status: "warning",
        });
      } else if (users) {
        res.render("UsersList", {
          title: "Λίστα Χρηστών",
          data: users,
        });
      }
    }
  );
});

/*
ROUTE THAT DELETES A USERS
*/
router.post("/deleteUser/:_id", verifyToken, async (req, res) => {
  User.findOneAndDelete({ _id: req.params._id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send(true);
      console.log("Deleted User : ", docs);
    }
  });
});
module.exports = router;
