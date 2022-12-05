const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const async = require('hbs/lib/async');
const verifyToken = require('../helper/validate-token')
const Patient = require("../models/patient");
const Visit = require("../models/visit");

router.use(bodyParser.urlencoded({ extended: true }));


const {
	getGreeceTime,
	getGreeceTimeOneYear,
	getDoctor,
	getDoctorWithMail,
	getDoctorFullName
} = require("../helper/helperFunctions");



router.get('/', verifyToken, async (req, res) => {
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


router.post('/', verifyToken, async (req, res) => {
	let { amka, lname, fname, dateVisit, symptoms, Gnomateush, Farmaka } = req.body
	// console.log(req.body);
	let patient = {}
	patient.fname = fname
	patient.lname = lname

	let doctor = {};
	doctor.amka = getDoctor(req);

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
			console.log(result);
			res.render('Visit', {
				title: 'Επίσκεψη Ασθενή',
				error: true,
				message: "Επιτυχής Καταχώρηση",
				status: "success",
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
