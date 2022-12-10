
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
const { getMyMail, getDoctor, getAgesCount , getGreeceTime,  getGreeceTimeOneYear} = require("../helper/helperFunctions");
router.use(bodyParser.urlencoded({ extended: true }));







/**
 * @method : GET
 * @param  {} "/"  HOME
 * @param  {} verifyToken -auth 
 */
router.get("/", verifyToken, async (req, res) => {

  const _db = DBDatabase.useDb('AuthUsers')
  const User = _db.model('User', usersSchema, 'user')


  try {
    let DocAmka = getDoctor(req)
    let users = await User.find({ "doctor.amka": DocAmka }).lean();



    res.render("admin/home", {
      title: "Αρχική",
      admin:true

      //signup:true
    });

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
  console.log('hi');
  res.render("admin/changePassword", {
    title: "Αλλαγή Κωδικού",
    admin:true
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
  let User = _db.model('User', usersSchema, 'user')

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



router.get("/DoctorsList", verifyToken, async (req, res) => {

  const _db = DBDatabase.useDb('AuthUsers')
  const User = _db.model('User', usersSchema, 'user')


  const users = await User.find({ role: "DOCTOR" }).exec(
    (err, users) => {
      if (err) {
        res.render("admin/DoctorsList", {
          title: "Λίστα Ιατρών",
          error: true,
          admin:true,
          message: err.message,
          status: "warning",
        });
      } else if (users) {
        res.render("admin/DoctorsList", {
          title: "Λίστα Ιατρών",
          admin:true,
          data: users,
        });
      }
    }
  );
});


router.get("/signup", (req, res) => {
  //HANDLE BAR
  res.render("admin/signup", {
    title: "Εγγραφή νέου Ιατρού",
    admin: true,
  });
});



router.post("/signup",verifyToken, async (req, res) => {
  //console.log(req.body)
  const _db = DBDatabase.useDb('AuthUsers')
  const User = _db.model('User', usersSchema, 'user')
  //AuthUsers
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
    res.render("admin/signup", {
      title: " Sign Up",
      error: true,
      message: "Ο κωδικός και η επιβεβαίωση κωδικού δεν ταιρίαζουν.",
      status: "warning",
      admin: true,
    });
  } else {
    email = email.toLowerCase();

    User.find({ email })
      .exec()
      .then((user) => {
        console.log(user);
        if (user.length >= 1) {
          return res.render("admin/signup", {
            title: "Sign Up",
            error: true,
            message: "User Exists",
            status: "warning",
            admin: true,
          });
        } else {
          bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
              return res.render("admin/signup", {
                title: " Sign Up",
                error: true,
                message: err,
                status: "danger",
                admin: true,
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
                  res.render("admin/signup", {
                    title: " Sign Up",
                    error: true,
                    message: "Πρόβλημα στην καταχώρηση πρόσβασης δικαιωμάτων.",
                    status: "warning",
                    admin: true,
                  });
                  return;
                }
              }
              let has_Access = true;
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
                Access_end_date,has_Access
              });

              user
                .save()
                .then((result) => {




                  res.render("admin/signup", {
                    title: " Sign Up",
                    message: "User created! You can now login",
                    error: true,
                    status: "success",
                    admin: true,
                  });
                })
                .catch((err) => {
                  if (err.code === 11000) {
                    res.render("admin/signup", {
                      title: " Sign Up",
                      message: "Βρέθηκε Χρήστης με αυτο το ΑΜΚΑ",
                      error: true,
                      status: "danger",
                      admin: true,
                    });
                  } else {
                    res.render("admin/signup", {
                      title: " Sign Up",
                      message: err,
                      error: true,
                      status: "danger",
                      admin: true,
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


router.get("/viewDoctor/:id", verifyToken, async (req, res) => {


  const _db = DBDatabase.useDb('AuthUsers')
  const User = _db.model('User', usersSchema, 'user')
  let docId =  (req.params.id) *1
  const user = await User.find({UserAmka:docId}).exec()



  res.render("admin/viewDoctor", {
    title: "Προβολή Ασθενή",
    user: user[0],
    admin: true,
    id: req.params.id,
  });
});




router.get("/Access/:id/:text", verifyToken, async (req, res) => {

console.log(req.params.id);
console.log(req.params.text);
  const _db = DBDatabase.useDb('AuthUsers')
  const User = _db.model('User', usersSchema, 'user')
  let DocId=req.params.id
  let bool= req.params.text

let doc = await User.findOneAndUpdate({UserAmka:DocId},{has_Access:bool},{new:true})



  if (!doc) {    
      res.render("admin/viewDoctor", {
        title: "Προβολή Ασθενή",
        error: true,
        message:'Error Occured',
        status: "warning",
        user: doc,
        id: req.params.id,
      });
  } else {
    res.render("admin/viewDoctor", {
      title: "Προβολή Ασθενή",
      error: true,
      message: 'Επιτυχής Ενημέρωση',
      status: "success",
      user: doc,
      id: req.params.id,
    });
  }

});

module.exports = router;
