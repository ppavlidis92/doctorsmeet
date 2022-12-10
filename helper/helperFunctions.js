const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");
var usersSchema = require("../models/users").usersSchema;
var emailSchema = require("../models/email").emailSchema;

const mongoose = require("mongoose");


// const _db = DBDatabase.useDb('AuthUsers')
// const User =_db.model('User',usersSchema,'user')


const RunFunctionOnConnect = async() => {
  const _db = DBDatabase.useDb('AuthUsers')
const User =_db.model('User',usersSchema,'user')

await User.updateMany({}, { $set:{ 
 has_Access :true
}})
}


function RedirectAuthUser(role, res) {
  if (role === "ADMIN") {
    res.render("home", {
      title: "Welcome Admin",
      admin: true,
    });
  } else if (role === "DOCTOR") {
    res.render("home", {
      title: "Welcome Doctor",
      admin: true,
    });
  } else if (role === "SECRETARY") {
    res.render("home", {
      title: "Welcome Secretary",
      admin: true,
    });
  }
}

function getGreeceTime() {
  // create Date object for current location
  var date = new Date();

  // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
  var utcTime = date.getTime() + date.getTimezoneOffset() * 60000;

  // time offset for Greece is +12
  var timeOffset = 4;

  // create new Date object for a different timezone using supplied its GMT offset.
  var greeceTime = new Date(utcTime + 3600000 * timeOffset);
  return greeceTime;
}

function getGreeceTimeOneYear() {
  var timeOffset = 4;
  var oneYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  var utcTimeOneYear = oneYear.getTime() + oneYear.getTimezoneOffset() * 60000;
  var greeceTimeOneYear = new Date(utcTimeOneYear + 3600000 * timeOffset);
  return greeceTimeOneYear;
}



const getDoctorFullName = async (req) => {
  const _db = DBDatabase.useDb('AuthUsers')
const User =_db.model('User',usersSchema,'user')

  let doctorName = '';
  let doctor = null;
  let token;
  try {
    token = req.cookies.authToken;
    // console.log("token "+token)
  } catch (error) {
    console.log(error);
  }

  if (token) {

    decodedUser = jwt.verify(token, process.env.JWT_KEY)
    if (decodedUser) {
      amka = decodedUser.doctor;
      let doctor = await User.find({ UserAmka: amka }).lean()
      doctorName = doctor[0].lname + ' ' + doctor[0].fname
    }

  }
  return doctorName
};


const getDoctorWithMail = async (url) => {

  const _db = DBDatabase.useDb('AuthUsers')
  const Email =_db.model('Email',emailSchema,'email')

  let email = await Email.find({ UrlId: url }).lean()
  console.log(email);
  if (email.length>0) {
   
    return email[0].doctor.amka
  } else {
    return null
  }

};

const getDoctor = (req) => {
  let doctor = {};
  let token;
  try {
    token = req.cookies.authToken;
    // console.log("token "+token)
  } catch (error) {
    console.log(error);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decodedUser) => {
      if (err) {
        doctor = null;
      } else {
        // let email = decodedUser.email;
        doctor = decodedUser.doctor;
      }
    });
  }
  return doctor;
};



const getRole = (req) => {
  let role = '';
  let token;
  try {
    token = req.cookies.authToken;
    // console.log("token "+token)
  } catch (error) {
    console.log(error);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decodedUser) => {
      if (err) {
        role = null;
      } else {
        // let email = decodedUser.email;
        role = decodedUser.role;
      }
    });
  }
  return role;
};


const getMyMail = (req) => {
  let email;
  try {
    token = req.cookies.authToken;
    // console.log("token "+token)
  } catch (error) {
    console.log(error);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decodedUser) => {
      if (err) {
        email = null;
      } else {
        // let email = decodedUser.email;
        email = decodedUser.email;
      }
    });
  }
  return email;
};


const getAgesCount = (patients, ageGroup) => {

  const patientsCount = patients.filter(patient => patient.age_group == ageGroup)

  return (patientsCount.length > 0) ? patientsCount.length : 0;
};

//name the functions you export
module.exports = {
  RedirectAuthUser,
  getRole,
  getGreeceTime,RunFunctionOnConnect,
  getGreeceTimeOneYear,
  getDoctor,
  getMyMail,
  getDoctorFullName, getDoctorWithMail,
  getAgesCount
};
