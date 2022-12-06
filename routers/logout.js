//-----MODULES--------//
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config()


//------HELPERS -------/
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * @param  {} '/'
 * @param  {} (req
 * @param  {} res
 */
router.get('/', (req, res) => {

    res.cookie('authToken', '', {expires: new Date(0)});
    res.redirect('/login')
});


module.exports = router;