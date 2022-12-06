
//-----MODULES--------//
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const async = require("hbs/lib/async");
const verifyToken = require("../helper/validate-token");
const patientHelper = require("../helper/patient")
const nodemailer = require('nodemailer');
require("dotenv").config();
const crypto = require("crypto")



//------MODELS ------------//
let patientSchema = require("../models/patient").patientSchema;
let emailSchema = require("../models/email").emailSchema;
let visitSchema = require("../models/visit").visitSchema;

//------HELPERS -------/
const ApplicationUrl = process.env.ApplicationUrl;
const UserMail = process.env.UserMail;
const UserPass = process.env.UserPass;
const mailHost = process.env.mailHost;
router.use(bodyParser.urlencoded({ extended: true }));
const { getGreeceTime, getGreeceTimeOneYear, getDoctor, getDoctorWithMail, getDoctorFullName
} = require("../helper/helperFunctions");




/**
 * @param  {} "/AddPatient"
 * @param  {} verifyToken
 * @param  {} async(req
 * @param  {} res
 */
router.get("/AddPatient", verifyToken, async (req, res) => {
  res.render("AddPatient", {
    title: "Εισαγωγή Ασθενή",
  });
});




/**
 * @param  {} "/AddPatient"
 * @param  {} verifyToken
 * @param  {} async(req
 * @param  {} res
 */
router.post("/AddPatient", verifyToken, async (req, res) => {

  let DocAmka = getDoctor(req)
  const _db_Doctor = DBDatabase.useDb(DocAmka.toString())
  const Patient = _db_Doctor.model('Patient', patientSchema, 'patient')

  // console.log(req.body)
  let {
    fname,
    lname,
    email,
    UserAmka,
    anaimia,
    streetName,
    streetNumber,
    streetZip,
    mobile_number,
    identification,
    AsfalistikoTameio,
    home_number,
    therapia,
    historyText,
    smoker,
    alcohol,
    alergia,
    armyText,
    gunaikologikaProblimata,
    annarotikiText,
    egkuos,
    therapiaText,
    eyesEarsDiscomfort,
    illggous,
    gastrenteriko,
    anapnefstiko,
    kukloforiako,
    ouropoihtiko,
    farmaka,
    anaimiaText,
    army,
    allo,
    alergiaText,

    traumatismoi,
    osteosinthesi,

    gunaikologikaProblimataText,

    egkuosText,
    annarotiki,
    sullipseis,
    apovoles,
    history,
    metavoliVarous,

    farmakaAitia,
    farmakaEidos,
    muoskeletiko,
    alloText,
    DateOfBirth,

  } = req.body;

  let Address = {
    streetName,
    streetNumber,
    streetZip,
  };


  //doctor
  let doctor = {};
  let completedByDoctor = false
  let help = getDoctor(req);
  doctor.amka = help;

  //start Date
  start_date = getGreeceTime()

  //history
  let historyObj = {}
  historyObj = patientHelper.returnParamsObj(historyObj, history, historyText)

  //army
  let armyObj = {}
  armyObj = patientHelper.returnParamsObj(armyObj, army, armyText)

  //annarotiki
  let annarotikiObj = {}
  annarotikiObj = patientHelper.returnParamsObj(annarotikiObj, annarotiki, annarotikiText)


  //therapia
  let therapiaObj = {}
  therapiaObj = patientHelper.returnParamsObj(therapiaObj, therapia, therapiaText)

  //anaimia
  let anaimiaObj = {}
  anaimiaObj = patientHelper.returnParamsObj(anaimiaObj, anaimia, anaimiaText)

  //alergia
  let alergiaObj = {}
  alergiaObj = patientHelper.returnParamsObj(alergiaObj, alergia, alergiaText)

  //gunaikologikaProblimata
  let gunaikologikaProblimataObj = {}
  gunaikologikaProblimataObj = patientHelper.returnParamsObj(gunaikologikaProblimataObj, gunaikologikaProblimata, gunaikologikaProblimataText)

  //egkuos
  let egkuosObj = {}
  egkuosObj = patientHelper.returnParamsObj(egkuosObj, egkuos, egkuosText)

  //farmaka
  let farmakaObj = {}
  farmakaObj = patientHelper.returnfarmakaObj(farmakaObj, farmaka, farmakaAitia, farmakaEidos)

  //allo
  let alloObj = {}
  alloObj = patientHelper.returnParamsObj(alloObj, allo, alloText)




  let familyTable = [];
  familyTable = patientHelper.CreateFamilyTable(req.body)

  //checkup
  let checkup = {}
  checkup = patientHelper.CreateCheckup(req.body)


  //egxeirish
  let egxeirish = {}
  egxeirish = patientHelper.CreateEgxeirish(req.body)

  //allesNosilies
  let allesNosilies = []
  allesNosilies = patientHelper.CreateNosilies(req.body)

  //SakxarodiDiabiti
  let SakxarodiDiabiti = {}
  SakxarodiDiabiti = patientHelper.CreateSakxarodiDiabiti(req.body)




  let age = new Date().getFullYear() - (new Date(DateOfBirth)).getFullYear()
  let age_group = patientHelper.GetAgeGroup(age)

  let status = 'EXIST'

  const patient = new Patient({
    _id: new mongoose.Types.ObjectId(),
    fname, lname, age_group,
    email: email.toLowerCase(), age,
    Address, start_date, UserAmka,
    DateOfBirth, doctor,
    annarotiki: annarotikiObj,
    alergia: alergiaObj,
    army: armyObj,
    history: historyObj,
    therapia: therapiaObj,
    anaimia: anaimiaObj,
    gunaikologikaProblimata: gunaikologikaProblimataObj,
    farmaka: farmakaObj,
    allo: alloObj,
    identification, muoskeletiko,
    AsfalistikoTameio, smoker, alcohol,
    eyesEarsDiscomfort, illggous, gastrenteriko,
    anapnefstiko, kukloforiako, ouropoihtiko,
    traumatismoi, osteosinthesi,
    egkuos: egkuosObj,
    sullipseis, apovoles, metavoliVarous,
    mobile_number, completedByDoctor, familyTable,
    checkup, egxeirish, allesNosilies,
    SakxarodiDiabiti, home_number, status
  });


  let existPatient = await Patient.findOne({ UserAmka: UserAmka }).lean()

  if (existPatient) {
    console.log('brika');
    res.render("AddPatient", {
      title: "Εισαγωγή Χρήστη",
      error: true,
      message: "Βρέθηκε χρήστης με αυτό το ΑΜΚΑ",
      status: "warning",
    });
  } else {
    console.log('de brika');
    await patient.save()
      .then((result) => {
        res.render("AddPatient", {
          title: "Εισαγωγή Χρήστη",
          error: true,
          message: "Επιτυχής Καταχώρηση",
          status: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("AddPatient", {
          title: "Εισαγωγή Χρήστη",
          error: true,
          message: err.message,
          status: "warning"
        });
      });
  }


});

/**
 * @param  {} "/AddEmailPatient"
 * @param  {} verifyToken
 * @param  {} async(req
 * @param  {} res
 */
router.post("/AddEmailPatient", verifyToken, async (req, res) => {


 
  let url = req.body.url
  console.log('url '+url);
  let DocAmka = await getDoctorWithMail(url);
  const _db_Doctor = DBDatabase.useDb(DocAmka.toString())
  const Patient = _db_Doctor.model('Patient', patientSchema, 'patient')

  let {
    fname,
    lname,
    email,
    UserAmka,
    anaimia,
    streetName,
    streetNumber,
    streetZip,
    mobile_number,
    identification,
    AsfalistikoTameio,
    home_number,
    therapia,
    historyText,
    smoker,
    alcohol,
    alergia,
    armyText,
    gunaikologikaProblimata,
    annarotikiText,
    egkuos,
    therapiaText,
    eyesEarsDiscomfort,
    illggous,
    gastrenteriko,
    anapnefstiko,
    kukloforiako,
    ouropoihtiko,
    farmaka,
    anaimiaText,
    army,
    allo,
    alergiaText,

    traumatismoi,
    osteosinthesi,

    gunaikologikaProblimataText,

    egkuosText,
    annarotiki,
    sullipseis,
    apovoles,
    history,
    metavoliVarous,

    farmakaAitia,
    farmakaEidos,
    muoskeletiko,
    alloText,
    DateOfBirth,


  } = req.body;

  let Address = {
    streetName,
    streetNumber,
    streetZip,
  };




  let completedByDoctor = false

  //doctor
  let doctor = {};

  doctor.amka = DocAmka
  console.log(doctor);

  //start Date
  start_date = getGreeceTime()

  //history
  let historyObj = {}
  historyObj = patientHelper.returnParamsObj(historyObj, history, historyText)

  //army
  let armyObj = {}
  armyObj = patientHelper.returnParamsObj(armyObj, army, armyText)

  //annarotiki
  let annarotikiObj = {}
  annarotikiObj = patientHelper.returnParamsObj(annarotikiObj, annarotiki, annarotikiText)


  //therapia
  let therapiaObj = {}
  therapiaObj = patientHelper.returnParamsObj(therapiaObj, therapia, therapiaText)

  //anaimia
  let anaimiaObj = {}
  anaimiaObj = patientHelper.returnParamsObj(anaimiaObj, anaimia, anaimiaText)

  //alergia
  let alergiaObj = {}
  alergiaObj = patientHelper.returnParamsObj(alergiaObj, alergia, alergiaText)

  //gunaikologikaProblimata
  let gunaikologikaProblimataObj = {}
  gunaikologikaProblimataObj = patientHelper.returnParamsObj(gunaikologikaProblimataObj, gunaikologikaProblimata, gunaikologikaProblimataText)

  //egkuos
  let egkuosObj = {}
  egkuosObj = patientHelper.returnParamsObj(egkuosObj, egkuos, egkuosText)

  //farmaka
  let farmakaObj = {}
  farmakaObj = patientHelper.returnfarmakaObj(farmakaObj, farmaka, farmakaAitia, farmakaEidos)

  //allo
  let alloObj = {}
  alloObj = patientHelper.returnParamsObj(alloObj, allo, alloText)




  let familyTable = [];
  familyTable = patientHelper.CreateFamilyTable(req.body)

  //checkup
  let checkup = {}
  checkup = patientHelper.CreateCheckup(req.body)


  //egxeirish
  let egxeirish = {}
  egxeirish = patientHelper.CreateEgxeirish(req.body)

  //allesNosilies
  let allesNosilies = []
  allesNosilies = patientHelper.CreateNosilies(req.body)

  //SakxarodiDiabiti
  let SakxarodiDiabiti = {}
  SakxarodiDiabiti = patientHelper.CreateSakxarodiDiabiti(req.body)




  let age = new Date().getFullYear() - (new Date(DateOfBirth)).getFullYear()
  let age_group = patientHelper.GetAgeGroup(age)

  let status = 'EXIST'

  const patient = new Patient({
    _id: new mongoose.Types.ObjectId(),
    fname, lname, age_group,
    // email: email.toLowerCase(), age,
    Address, start_date, UserAmka,
    DateOfBirth, doctor,
    annarotiki: annarotikiObj,
    alergia: alergiaObj,
    army: armyObj,
    history: historyObj,
    therapia: therapiaObj,
    anaimia: anaimiaObj,
    gunaikologikaProblimata: gunaikologikaProblimataObj,
    farmaka: farmakaObj,
    allo: alloObj,
    identification, muoskeletiko,
    AsfalistikoTameio, smoker, alcohol,
    eyesEarsDiscomfort, illggous, gastrenteriko,
    anapnefstiko, kukloforiako, ouropoihtiko,
    traumatismoi, osteosinthesi,
    egkuos: egkuosObj,
    sullipseis, apovoles, metavoliVarous,
    mobile_number, completedByDoctor, familyTable,
    checkup, egxeirish, allesNosilies,
    SakxarodiDiabiti, home_number, status
  });


  let existPatient = await Patient.findOne({ UserAmka: UserAmka }).lean()

  if (existPatient) {
    console.log('Brika');

    res.render("405", {
      title: "Εγγραφή Ασθενή",
      login: true,
      error: true,
      message: 'To ΑΜΚΑ το οποίο δώσατε είναι ήδη καταχωρημένο. Μεταβείται ξάνα στο σύνδεσμο απο το email σας και πραγματοποιήστε εγγραφή με διαφορετικό ΑΜΚΑ',
      status: "warning",
    });


  } else {
    console.log('den brika');
    await patient.save()
      .then((result) => {


        const _db = DBDatabase.useDb('AuthUsers')
        const Email = _db.model('Email', emailSchema, 'email')

        Email.findOneAndUpdate({ UrlId: url }, { isCompleted: true }, (err, email) => {
          if (err) {
            res.render("405", {
              title: "Εγγραφή Ασθενή",
              login: true,
              error: true,
              message: 'Αναφέρεται στον Ιατρό σας οτι αντιμετωπήσατε πρόβλημα στην σύνδεση σας',
              status: "warning",
            });
          } else {
            res.render("successEmail", {
              title: "Εγγραφή Ασθενή",
              login: true,
              message: 'Η εγγραφή σας πραγματοποιήθηκε με επιτυχία',
              status: "success",
            });
          }
        })


      })
      .catch((err) => {
        console.log(err);
        res.render("AddPatient", {
          title: "Εισαγωγή Χρήστη",
          error: true,
          message: err.message,
          status: "warning"
        });
      });

  }

});


/**
 * @param  {} "/SendPatientEmailForm"
 * @param  {} verifyToken
 * @param  {} async(req
 * @param  {} res
 */
router.post("/SendPatientEmailForm", verifyToken, async (req, res) => {


  const _db = DBDatabase.useDb('AuthUsers')
  const Email = _db.model('Email', emailSchema, 'email')



  const newUserEmail = req.body.AddUserWithMail
  const Subject = req.body.AddUserWithMailSubject


  let doctorFullName = await getDoctorFullName(req)
  let doctorAmka = getDoctor(req);
  let doctor = {}
  doctor.amka = doctorAmka



  const uuid = crypto.randomUUID()
  let userUrl = ApplicationUrl + 'email/emailAdd/' + uuid
  let Text = ' Καλησπέρα σας,  Παρακαλώ όπως επισκεφτείτε τον παρακάτω σύνδεσμο, ' + userUrl + ' προκειμένου να γίνει η εγγραφή σας στην πλατφόρα του Ιατρού σας (Δρ. ' + doctorFullName + ')'

  console.log(Text);

  const email = new Email({
    _id: new mongoose.Types.ObjectId(),
    UrlId: uuid,
    doctor,
    isCompleted: false
  })


  await email.save().then((result) => {


    var transporter = nodemailer.createTransport({
      host: mailHost,
      port: 465,
      secure: true, // use SSL
      auth: {
        user: UserMail,
        pass: UserPass
      },
      // === add this === //
      tls: { rejectUnauthorized: false }
    }
    );

    var mailOptions = {
      from: UserMail,
      to: newUserEmail,
      subject: Subject,
      text: Text
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.render("AddPatient", {
          title: "Εισαγωγή Χρήστη",
          error: true,
          message: "Το Email Στάλθηκε με επιτυχία",
          status: "success",
        });
      }
    });


  })
    .catch((err) => {
      console.log(err);
      res.render("AddPatient", {
        title: "Εισαγωγή Χρήστη",
        error: true,
        message: err.message,
        status: "warning"
      });
    });




});

/**
 * @param  {} "/PatientsList"
 * @param  {} verifyToken
 * @param  {} async(req
 * @param  {} res
 */
router.get("/PatientsList", verifyToken, async (req, res) => {

  let DocAmka = getDoctor(req)
  const _db_Doctor = DBDatabase.useDb(DocAmka.toString())
  const Patient = _db_Doctor.model('Patient', patientSchema, 'patient')

  const patients = await Patient.find({ status: { $ne: 'DELETED' } }).exec(
    (err, patients) => {
      if (err) {
        res.render("PatientsList", {
          title: "Λίστα Ασθενών",
          error: true,
          message: err.message,
          status: "warning",
        });
      } else if (patients) {
        res.render("PatientsList", {
          title: "Λίστα Χρηστών",
          data: patients
        });
      }
    }
  )




});


/**
 * @param  {id"} "/viewPatient/
 * @param  {} verifyToken
 * @param  {} async(req
 * @param  {} res
 */
router.get("/viewPatient/:id", verifyToken, async (req, res) => {

  /**
 * $lookup
 * from: The target collection.
 * localField: The local join field.
 * foreignField: The target join field.
 * as: The name for the results.
 * pipeline: The pipeline to run on the joined collection.
 * let: Optional variables to use in the pipeline field stages.
 */
  // {
  //   from: "movies",
  //   localField: "movie_id",
  //   foreignField: "_id",
  //   as: "movie_info"
  // }
  //let patient = await Patient.findById({ _id: req.params.id });


  let DocAmka = getDoctor(req)
  const _db_Doctor = DBDatabase.useDb(DocAmka.toString())
  const Patient = _db_Doctor.model('Patient', patientSchema, 'patient')
  const Visit = _db_Doctor.model('Visit', visitSchema, 'visit')

  const docs = await Patient.aggregate([{
    $lookup:
    {
      from: "visit",
      localField: "UserAmka",
      foreignField: "Amka",
      as: "PatientVisit"
    }
  }]).exec()

  let patient
  docs.forEach(p => {
    if (p._id == req.params.id) {
      // console.log(p);
      patient = p;
    }
  })

  res.render("viewPatient", {
    title: "Προβολή Ασθενή",
    user: patient,
    id: req.params.id,
  });
});

module.exports = router;
