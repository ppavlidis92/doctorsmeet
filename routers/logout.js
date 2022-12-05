const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyToken =require('../helper/validate-token')

const JWT_KEY = process.env.JWT_KEY


const { RedirectAuthUser } = require('../helper/helperFunctions');


router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', (req, res) => {

    res.cookie('authToken', '', {expires: new Date(0)});
    res.redirect('/login')
});


module.exports = router;