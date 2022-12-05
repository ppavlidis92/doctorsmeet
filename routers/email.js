const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const async = require("hbs/lib/async");
const verifyToken = require("../helper/validate-token");
var User = require("../models/users");
const bcrypt = require("bcrypt");
const Email = require("../models/email");

const { getMyMail } = require("../helper/helperFunctions");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/emailAdd/:id", async (req, res) => {
  let url = req.params.id



  const emails = await Email.find({ UrlId: url , isCompleted: false }).exec(
    (err, results) => {
      if (err) {
        res.render("405", {
          title: "Εγγραφή Ασθενή",
          login: true,
          error: true,
          message: 'Αναφέρεται στον Ιατρό σας οτι αντιμετωπήσατε πρόβλημα στην σύνδεση σας',
          status: "warning",
        });
      }
      if (results.length > 0) {

       

        res.render("emailAdd", {
          title: "Εγγραφή Ασθενή",
          login: true,
         
        });
      
      } else {
        res.render("405", {
          title: "Εγγραφή Ασθενή",
          login: true,
          error: true,
          message: 'Δεν βρέθηκε ο σύνδεσμος ο οποίος δώσατε',
          status: "warning",
        });
      }
    }
  )


});



module.exports = router;
