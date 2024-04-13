const express = require('express');

const {getPendingProviders,getApprovedProviders, addProvider, updateProvider, deleteProvider} = require('../controllers/providers');

const router = express.Router({mergeParams:true});

const {protect,authorize} = require('../middleware/auth');

router.route('/pending').get(protect, getPendingProviders)
router.route('/approved').get(protect, getApprovedProviders)
router.route('/').post(protect, authorize('user','admin'), addProvider)
router.route('/:id').put(protect, authorize('user','admin'), updateProvider).delete(protect, authorize('user','admin'), deleteProvider)

// router.route('/:id').get(protect,getBooking).put(protect,authorize('admin','user'),updateBooking).delete(protect,authorize('admin','user'),deleteBooking);

module.exports=router;