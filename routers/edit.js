const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const async = require("hbs/lib/async");
const verifyToken = require("../helper/validate-token");
var User = require("../models/users");
var Patient = require("../models/patient");

const patientHelper = require("../helper/patient")

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/editUser/:id", verifyToken, async (req, res) => {
  let user = await User.findById({ _id: req.params.id });
  console.log("user");
  res.render("editUser", {
    title: "Επεξεργασία Χρήστη",
    user: user,
    id: req.params.id,
  });
});

router.post("/editUser/:id", verifyToken, async (req, res) => {
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
    streetName: streetName ? streetName : "",
    streetNumber: streetNumber ? streetNumber : "",
    streetZip: streetZip ? streetZip : "",
  };

  User.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      fname: fname ? fname : "",
      lname: lname ? lname : "",
      age: age ? age : "",
      UserAmka: UserAmka ? UserAmka : "",
      email: email ? email : "",
      mobile_number: mobile_number ? mobile_number : "",
    },
    { new: true },
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
        res.render("editUser", {
          title: "Επεξεργασία Χρήστη",
          user: user,
          id: req.params.id,
          error: true,
          message: "Επιτυχής Καταχώρηση Χρήστη",
          status: "success",
        });
      }
    }
  );
});


router.get("/printPatient/:id", verifyToken, async (req, res) => {
  let patient = await Patient.findById({ _id: req.params.id });

  res.render("printPatient", {
    title: "Προεπισκοπηση",
    user: patient,
    id: req.params.id,
    login:true
  });

});


router.post("/printPatient/:id", verifyToken, async (req, res) => {
  let patient = await Patient.find({ _id: req.params.id }).exec()
  if (patient) {
    res.send(patient);

  }

});


router.post("/getPatient/:id", verifyToken, async (req, res) => {
  let patient = await Patient.find({ _id: req.params.id }).exec()
  if (patient) {
    res.send(patient);

  }

});


router.get("/editPatient/:id", verifyToken, async (req, res) => {
  let patient = await Patient.findById({ _id: req.params.id });

  res.render("editPatient", {
    title: "Επεξεργασία Ασθενή",
    user: patient,
    id: req.params.id,
  });
});


router.get("/submitPatient/:id", verifyToken, async (req, res) => {
  let patient = await Patient.findById({ _id: req.params.id });

  res.render("submitPatient", {
    title: "Ολοκλήρωση Φόρμας Ασθενή",
    user: patient,
    id: req.params.id,
  });
});


router.post("/submitPatient/:id", verifyToken, async (req, res) => {


  let {
    gnorizeteAstheni,
    parakolouthisateAstheni,
    upsos,
    varos,
    thorakas,
    perimetosKoilias,
    eispnoi,
    ekpnoi,
    anomaliesDiaplash,
    sfikseis,
    sfikseisRithmos,
    sustolikiA,
    diastolikiA,
    sustolikiB,
    diastolikiB,
    akroasiKardias,
    kardiakiOsi,
    kardiakiOsiEanOxi,
    kardiakiHxoi,
    kardiakiHxoiOxi,
    AkroashThoraka,
    Dispnoia,
    EpiskopisiKoilias,
    Oules,
    EmfanisiGlossas,
    KatastashOulon,
    flevikiKukloforia,
    neurikoSusthma,
    Antanaklastika,
    AuksimenoKundino,
    Ourodoxos,
    varosOuros,
    proteinomenosGiaAsfaleia,
    Apporipsh,
    leukoma,
    SakxaroOyra,
    diadikasiaOura,
    blabhMuoskeletiko,
    diogkoshThiroeidi,
    dermatotherapeia,
    leptomeriesAKat,
    DateOfSubmit,
    peraiteroElegxos,
    anablithei,
    oloklirosh
  } = req.body;



  let ekthesiIatrou = {}
  ekthesiIatrou.gnorizeteAstheni = gnorizeteAstheni
  ekthesiIatrou.parakolouthisateAstheni = parakolouthisateAstheni
  ekthesiIatrou.varos = varos
  ekthesiIatrou.upsos = upsos
  ekthesiIatrou.thorakas = thorakas

  ekthesiIatrou.perimetosKoilias = perimetosKoilias
  ekthesiIatrou.eispnoi = eispnoi
  ekthesiIatrou.ekpnoi = ekpnoi
  ekthesiIatrou.AkroashThoraka = AkroashThoraka

  ekthesiIatrou.anomaliesDiaplash = anomaliesDiaplash
  ekthesiIatrou.sfikseis = sfikseis
  ekthesiIatrou.sfikseisRithmos = sfikseisRithmos
  ekthesiIatrou.sustolikiA = sustolikiA

  ekthesiIatrou.diastolikiA = diastolikiA
  ekthesiIatrou.sustolikiB = sustolikiB
  ekthesiIatrou.diastolikiB = diastolikiB
  ekthesiIatrou.akroasiKardias = akroasiKardias
  ekthesiIatrou.kardiakiOsi = kardiakiOsi
  ekthesiIatrou.kardiakiOsiEanOxi = kardiakiOsiEanOxi
  ekthesiIatrou.kardiakiHxoi = kardiakiHxoi
  ekthesiIatrou.kardiakiHxoiOxi = kardiakiHxoiOxi
  ekthesiIatrou.Dispnoia = Dispnoia
  ekthesiIatrou.EpiskopisiKoilias = EpiskopisiKoilias
  ekthesiIatrou.Oules = Oules
  ekthesiIatrou.EmfanisiGlossas = EmfanisiGlossas
  ekthesiIatrou.KatastashOulon = KatastashOulon
  ekthesiIatrou.flevikiKukloforia = flevikiKukloforia



  ekthesiIatrou.neurikoSusthma = neurikoSusthma
  ekthesiIatrou.Antanaklastika = Antanaklastika
  ekthesiIatrou.Ourodoxos = Ourodoxos
  ekthesiIatrou.varosOuros = varosOuros
  ekthesiIatrou.leukoma = leukoma
  ekthesiIatrou.SakxaroOyra = SakxaroOyra
  ekthesiIatrou.diadikasiaOura = diadikasiaOura
  ekthesiIatrou.blabhMuoskeletiko = blabhMuoskeletiko
  ekthesiIatrou.diogkoshThiroeidi = diogkoshThiroeidi
  ekthesiIatrou.dermatotherapeia = dermatotherapeia
  ekthesiIatrou.proteinomenosGiaAsfaleia = (proteinomenosGiaAsfaleia == 'true') ? true : false

  ekthesiIatrou.AuksimenoKundino = (AuksimenoKundino == 'true') ? true : false
  ekthesiIatrou.Apporipsh = (Apporipsh == 'true') ? true : false
  ekthesiIatrou.peraiteroElegxos = (peraiteroElegxos == 'true') ? true : false
  ekthesiIatrou.anablithei = (anablithei == 'true') ? true : false
  ekthesiIatrou.leptomeriesAKat = leptomeriesAKat
  ekthesiIatrou.DateOfSubmit = DateOfSubmit

  if (oloklirosh == 'true') {
    let completedByDoctor = true

    Patient.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        ekthesiIatrou,
        completedByDoctor

      },
      { new: true },
      function (err, patient) {
        if (err) {
          res.render("submitPatient", {
            title: "Ολοκλήρωση Φόρμας Ασθενή",
            user: patient,
            id: req.params.id,
            error: true,
            message: err.message,
            status: "warning",
          });
        } else {

          res.render("submitPatient", {
            title: "Ολοκλήρωση Φόρμας Ασθενή",
            user: patient,
            id: req.params.id,
            error: true,
            message: "Επιτυχής Καταχώρηση Ασθενή",
            status: "success",
          });
        }
      }
    );
  } else {

    Patient.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        ekthesiIatrou,

      },
      { new: true },
      function (err, patient) {
        if (err) {
          res.render("submitPatient", {
            title: "Ολοκλήρωση Φόρμας Ασθενή",
            user: patient,
            id: req.params.id,
            error: true,
            message: err.message,
            status: "warning",
          });
        } else {

          res.render("submitPatient", {
            title: "Ολοκλήρωση Φόρμας Ασθενή",
            user: patient,
            id: req.params.id,
            error: true,
            message: "Επιτυχής Καταχώρηση Ασθενή",
            status: "success",
          });
        }
      }
    );
  }



});


router.post("/editPatient/:id", verifyToken, async (req, res) => {
  console.log('editPatient');
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
    annarotikiTextInput,
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





  //history
  let historyObj = {}
  historyObj = patientHelper.returnParamsObj(historyObj, history, historyText)

  //army
  let armyObj = {}
  armyObj = patientHelper.returnParamsObj(armyObj, army, armyText)

  //annarotiki
  let annarotikiObj = {}
  annarotikiObj = patientHelper.returnParamsObj(annarotikiObj, annarotiki, annarotikiTextInput)


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




  Patient.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      fname, lname, age_group,
      email: email.toLowerCase(), age,
      Address, UserAmka,
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
      SakxarodiDiabiti, home_number
    },
    { new: true },
    function (err, patient) {
      if (err) {
        res.render("editPatient", {
          title: "Επεξεργασία Ασθενή",
          user: patient,
          id: req.params.id,
          error: true,
          message: err.message,
          status: "warning",
        });
      } else {
        console.log(patient);
        res.render("editPatient", {
          title: "Επεξεργασία Ασθενή",
          user: patient,
          id: req.params.id,
          error: true,
          message: "Επιτυχής Καταχώρηση Ασθενή",
          status: "success",
        });
      }
    }
  );

});
module.exports = router;
