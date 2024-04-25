const express = require('express');
const { sendEmail }  = require('../controllers/email');

const router = express.Router({ mergeParams:true });

const { protect } = require('../middleware/auth');

router.route('/email').post(protect, sendEmail);

module.exports = router;