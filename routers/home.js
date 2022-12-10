
//-----MODULES--------//
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const async = require("hbs/lib/async");
const verifyToken = require("../helper/validate-token");
const bcrypt = require("bcrypt");

//------MODELS ------------//
let usersSchema = require("../models/users").usersSchema;
let patientSchema = require("../models/patient").patientSchema;
let visitSchema = require("../models/visit").visitSchema;
let emailSchema = require("../models/email").emailSchema;


//------HELPERS -------/
const { getMyMail,getDoctor,getAgesCount,getRole} = require("../helper/helperFunctions");
router.use(bodyParser.urlencoded({ extended: true }));







/**
 * @method : GET
 * @param  {} "/"  HOME
 * @param  {} verifyToken -auth 
 */
router.get("/", verifyToken, async (req, res) => {

  const _db = DBDatabase.useDb('AuthUsers')
  const User =_db.model('User',usersSchema,'user')



  try {

  let DocAmka = getDoctor(req)
  let users = await User.find({"doctor.amka" : DocAmka}).lean();


  //initialize Database and collection
  const _db_Doctor = DBDatabase.useDb(DocAmka.toString())
  const Patient =_db_Doctor.model('Patient',patientSchema,'patient')
  const Visit =_db_Doctor.model('Visit',visitSchema,'visit')

 let patient = await Patient.find({}).lean();
 //console.log(patient);
 if(patient.length>0){
  let Group18to25 = getAgesCount(patient,'18-25')
  let Group25to40 = getAgesCount(patient,'25-40')
  let Group40to65 = getAgesCount(patient,'40-65')
  let GroupOver65 = getAgesCount(patient,'65+')

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

 }else{


  res.render("home", {
    title: "Αρχική",
    users : users.length,
    patients:'-',
    Group18to25:'-',
    Group25to40:'-',
    Group40to65:'-',
    GroupOver65:'-'
  });
 }
 
 




  
 
} catch (error) {
  console.log(error);
}
});


/**
 * @method : GET
 * @param  {} "/changePassword"
 * @param  {} verifyToken
 */
router.get("/changePassword", verifyToken, async (req, res) => {
  res.render("changePassword", {
    title: "Αλλαγή Κωδικού",
    //signup:true
  });
});


/**
 * @method : POST
 * @param  {} "/changePassword"
 * @param  {} verifyToken
 */
router.post("/changePassword", verifyToken, async (req, res) => {


  let _db = DBDatabase.useDb('AuthUsers')
  let User =_db.model('User',usersSchema,'user')

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
        let role = getRole(req)
        if(role=='ADMIN'){
          res.render("changePassword", {
            title: "Αλλαγή Κωδικού",
            error: true,
            message: "Ο κωδικός άλλαξε",
            status: "success",
            admin:true
          });
          return;
        }else{
          res.render("changePassword", {
            title: "Αλλαγή Κωδικού",
            error: true,
            message: "Ο κωδικός άλλαξε",
            status: "success",
          });
          return;
        }
        
      
      } else {
        res.render("changePassword", {
          title: "Αλλαγή Κωδικού",
          error: true,
          message:'Αγνωστό Σφάλμα 1000.',
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
