
//-----MODULES--------//
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const async = require("hbs/lib/async");
const verifyToken = require("../helper/validate-token");
const bcrypt = require("bcrypt");


//------MODELS ------------//
let emailSchema = require("../models/email").emailSchema;
let usersSchema = require("../models/users").usersSchema;



//------HELPERS -------/
const { getMyMail } = require("../helper/helperFunctions");
router.use(bodyParser.urlencoded({ extended: true }));



/**
 * @method GET
 * @param  {id"} "/emailAdd/
 * @param  {} async(req
 * @param  {} res
 */
router.get("/emailAdd/:id", async (req, res) => {
  let url = req.params.id


  const _db = DBDatabase.useDb('AuthUsers')
  const Email =_db.model('Email',emailSchema,'email')
  

  const emailIsCompleted =  await Email.find({ UrlId: url}).lean()
  let isCompleted = emailIsCompleted[0].isCompleted
if (isCompleted) {
  res.render("405", {
    title: "Εγγραφή Ασθενή",
    login: true,
    error: true,
    message: 'Αυτός ο σύνδεσμος έχει καταγραφεί παρακαλώ επικοινωνήστε με τον Ιατρό σας',
    status: "warning",
  });
}


  const emails = await Email.find({ UrlId: url, isCompleted: false }).exec(
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
