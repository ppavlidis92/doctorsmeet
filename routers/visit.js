
//-----MODULES--------//
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const async = require('hbs/lib/async');
const verifyToken = require('../helper/validate-token')


//------MODELS ------------//
let patientSchema = require("../models/patient").patientSchema;
let visitSchema = require("../models/visit").visitSchema;



//------HELPERS -------/
const {	getGreeceTime,	getGreeceTimeOneYear,	getDoctor,	getDoctorWithMail,	getDoctorFullName
} = require("../helper/helperFunctions");
router.use(bodyParser.urlencoded({ extended: true }));



/**
 * @param  {} '/'
 * @param  {} verifyToken
 * @param  {} async(req
 * @param  {} res
 */
router.get('/', verifyToken, async (req, res) => {

	let DocAmka = getDoctor(req)
	const _db_Doctor = DBDatabase.useDb(DocAmka.toString())
	const Patient = _db_Doctor.model('Patient', patientSchema, 'patient')
  

	const patients = await Patient.find({ status: { $ne: 'DELETED' } }).exec(
		(err, patients) => {
			if (err) {
				res.render('Visit', {
					title: 'Επίσκεψη Ασθενή',
					error: true,
					message: err.message,
					status: "warning",
				});
			}
			res.render('Visit', {
				title: 'Επίσκεψη Ασθενή',
				data: patients
			});

		}
	)

});



/**
 * @param  {} '/'
 * @param  {} verifyToken
 * @param  {} async(req
 * @param  {} res
 */
router.post('/', verifyToken, async (req, res) => {

	let DocAmka = getDoctor(req)
	const _db_Doctor = DBDatabase.useDb(DocAmka.toString())
	const Visit = _db_Doctor.model('Visit', visitSchema, 'visit')
	const Patient = _db_Doctor.model('Patient', patientSchema, 'patient')
  
	const patients = await Patient.find({ status: { $ne: 'DELETED' } }).lean()


	let { amka, lname, fname, dateVisit, symptoms, Gnomateush, Farmaka } = req.body
	// console.log(req.body);
	let patient = {}
	patient.fname = fname
	patient.lname = lname

	let doctor = {};
	doctor.amka = DocAmka;

	const visit = new Visit({
		_id: new mongoose.Types.ObjectId(),
		Amka: amka,
		patient,
		doctor,
		dateVisit: dateVisit,
		symptoms,
		Gnomateush,
		Farmaka
	})

	await visit.save()
		.then((result) => {

		

			res.render('Visit', {
				title: 'Επίσκεψη Ασθενή',
				error: true,
				message: "Επιτυχής Καταχώρηση",
				status: "success",
				data: patients
			});
		
		})
		.catch((err) => {
			console.log(err);
			res.render("Visit", {
				title: "Επίσκεψη Ασθενή",
				error: true,
				message: err.message,
				status: "warning"
			});
		});
});

module.exports = router;
