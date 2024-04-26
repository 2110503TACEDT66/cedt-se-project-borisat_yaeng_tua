const express = require('express');
const { sendEmail }  = require('../controllers/email');
const { getPayments, updatePayment } = require('../controllers/payments')

const router = express.Router({ mergeParams:true });

const { protect } = require('../middleware/auth');

router.route('/email').post(protect, sendEmail);

router.route('/').get(protect, getPayments);
router.route('/:id').put(protect, updatePayment);



module.exports = router;