const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const async = require("hbs/lib/async");
const verifyToken = require("../helper/validate-token");
var User = require("../models/users");
var Patient = require("../models/patient");
const bcrypt = require("bcrypt");

const { getMyMail,getAgesCount } = require("../helper/helperFunctions");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", verifyToken, async (req, res) => {
  let users = await User.find({}).lean();
  let patient = await Patient.find({}).lean();
  let Group18to25 = getAgesCount(patient,'18-25')
  let Group25to40 = getAgesCount(patient,'25-40')
  let Group40to65 = getAgesCount(patient,'40-65')
  let GroupOver65 = getAgesCount(patient,'65+')
  console.log(Group18to25);
  console.log(Group25to40);
  console.log(Group40to65);
  console.log(GroupOver65);

  res.render("home", {
    title: "Αρχική",
    users : users.length,
    patients:patient.length,
    Group18to25,
    Group25to40,
    Group40to65,
    GroupOver65
    //signup:true
  });
});

router.get("/changePassword", verifyToken, async (req, res) => {
  res.render("changePassword", {
    title: "Αλλαγή Κωδικού",
    //signup:true
  });
});

router.post("/changePassword", verifyToken, async (req, res) => {
  let { OldPassword, newPassword, RepeatPassword } = req.body;

  let email = getMyMail(req);
  let user = await User.find({ email }).lean();

  let error = false;
  let message = "";
  let messageArray = [];

  let matchOldAndGiven = bcrypt.compareSync(OldPassword, user[0].password); // true

  if (!matchOldAndGiven) {
    message = "O Παλίος Κωδικός δεν ταιρίαζει με τον υπάρχων κωδικό";
    messageArray.push(message);
    error = true;
  }

  if (newPassword !== RepeatPassword) {
    message = "Ο κωδικός και η επιβεβαίωση κωδικού δεν ταιρίαζουν";
    messageArray.push(message);
    error = true;
  }

  if (error) {
    let finalmessage = messageArray.join(", ");
    res.render("changePassword", {
      title: "Αλλαγή Κωδικού",
      error: true,
      message: finalmessage,
      status: "warning",
    });
    return;
  }

  bcrypt.hash(newPassword, 10, async (err, hash) => {
    if (err) {
      console.log(err);
      res.render("changePassword", {
        title: "Αλλαγή Κωδικού",
        error: true,
        message: err.message,
        status: "warning",
      });
      return;
    } else if (hash) {
      const result = await User.updateOne({ email }, { password: hash });
      if (result) {
        console.log(result);
        res.render("changePassword", {
          title: "Αλλαγή Κωδικού",
          error: true,
          message: "Ο κωδικός άλλαξε",
          status: "success",
        });
        return;
      } else {
        res.render("changePassword", {
          title: "Αλλαγή Κωδικού",
          error: true,
          message: err.message,
          status: "warning",
          signup: true,
        });
        return;
      }
    }
  });
});

router.get("/AdminHome", verifyToken, async (req, res) => {
  res.render("AdminHome");
});

module.exports = router;
