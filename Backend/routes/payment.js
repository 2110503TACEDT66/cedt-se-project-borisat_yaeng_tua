const express = require('express');
const { getPayments, updatePayment, getPayment } = require('../controllers/payments')

const router = express.Router({ mergeParams:true });

const { protect } = require('../middleware/auth');


router.route('/').get(protect, getPayments);
router.route('/:id').put(protect, updatePayment).get(protect, getPayment);



module.exports = router;