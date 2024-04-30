const express = require('express');
const multer = require("multer");
const { getCars, getCar, updateCar, getCarRentals, getProviderCars } = require('../controllers/cars');
const { createCar, deleteCar } = require('../controllers/jestcars')
const { uploads } = require('../controllers/upload');



//Include other resource routers
const bookingRouter = require('./bookings');
const reviewRouter = require('./reviews');

const router = express.Router();
const upload = multer();

const { protect, authorize } = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:carId/bookings', bookingRouter);
router.use('/:carId/reviews', reviewRouter);

router.route('/carRental').get(getCarRentals);
router.route('/').get(getCars).post(protect, authorize('provider', 'admin'), createCar);
router.route('/:id').get(getCar).put(protect, authorize('provider', 'admin'), updateCar).delete(protect, authorize('provider', 'admin'), deleteCar);
router.route('/upload').post(protect, authorize('provider', 'admin', 'user'), upload.single('image'), uploads)
router.route('/provider/:id').get(getProviderCars);

module.exports = router;
