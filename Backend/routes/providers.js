const express = require('express');

const {getProviders , getPendingProviders, getApprovedProviders, addProvider, updateProvider, deleteProvider} = require('../controllers/providers');

const router = express.Router({mergeParams:true});

const {protect,authorize} = require('../middleware/auth');

router.route('/pending').get(protect, authorize('user','admin'),getPendingProviders)
router.route('/approved').get(protect, authorize('user','admin'),getApprovedProviders)
router.route('/').get(getProviders).post(protect, authorize('user','admin'), addProvider)
router.route('/:id').put(protect, authorize('user','admin'), updateProvider).delete(protect, authorize('user','admin'), deleteProvider)

module.exports=router;