const express = require("express")
const Stripe = require("stripe");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {


    const bookingData = req.body.bookingData
    console.log(bookingData);
    const bookingInformation = {
        user : bookingData.user,
        car : {
            _id : bookingData.car.data._id,
            FeePerDay : bookingData.car.data.FeePerDay,
            LicensePlate : bookingData.car.data.LicensePlate,
            provider : bookingData.car.data.provider
        },
        bookingDateFrom : bookingData.bookingDateFrom,
        bookingDateTo : bookingData.bookingDateTo
    }

    const customer = await stripe.customers.create({
        metadata: {
            userId : req.body.userId,
            cart : JSON.stringify(bookingInformation)
        }
    })

    const amountOfBooking = parseInt(bookingData.bookingDateTo.substring(8, 10)) - parseInt(bookingData.bookingDateFrom.substring(8, 10)) + 1;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'promptpay'],
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              images: [bookingData.car.data.Picture1.replace("amp;", "")],
              name: bookingData.car.data.Brand,
              description : `LicensePlate: ${bookingData.car.data.LicensePlate}`,
              metadata :{
                id : bookingData.car.data._id
              }
            },
            unit_amount: bookingData.car.data.FeePerDay,
          },
          quantity: amountOfBooking,
        },
      ],
      phone_number_collection : {
        enabled : true,
      },
      customer: customer.id,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['TH'],
      },
      success_url: 'http://localhost:3000/checkout-success',
      cancel_url: 'http://localhost:3000/',
    });
    res.send({url : session.url});
  });

  //stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

// endpointSecret = "whsec_35689721ca32fba97c890f868f6f6be48df4c0bad086321e4d2097684b69f62e";

router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

    let data;
    let eventType;

  if(endpointSecret){

    let event;
    
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log("Webhook verified");
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    data = event.data.object;
    eventType = event.type
  }else{
    data = request.body.data.object;
    eventType = request.body.type
  }

  

  // Handle the event

  if(eventType === "checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then((customer) => {
        console.log(customer);
        console.log("data : ", data);
    }).catch((err) => {
        console.log(err.message);
    })
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});



  module.exports = router;
  