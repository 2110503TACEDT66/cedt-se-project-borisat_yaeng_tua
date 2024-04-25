const express = require("express")
const Stripe = require("stripe");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {

    const bookingData = req.body.bookingData
    console.log(bookingData);

    const amountOfBooking = parseInt(bookingData.bookingDateTo.substring(8, 10)) - parseInt(bookingData.bookingDateFrom.substring(8, 10)) + 1;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'promptpay'],
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: bookingData.car.data.Brand,
              images: [bookingData.car.data.Picture1.replace("amp;", "")],
              description : `Model: ${bookingData.car.data.Model} LicensePlate: ${bookingData.car.data.LicensePlate}`,
              metadata :{
                id : bookingData.car.data._id
              }
            },
            unit_amount: bookingData.car.data.FeePerDay,
          },
          quantity: amountOfBooking,
        },
      ],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['TH'],
      },
      success_url: 'http://localhost:3000/checkout-success',
      cancel_url: 'http://localhost:3000/',
    });
    console.log(session);
    res.send({url : session.url});
  });

  module.exports = router;
  