const Payment = require("../models/Payment")

//@desc     Get all payments
//@route    GET /api/v1/payments
//@access   Private
exports.getPayments = async (req, res, next) => {
    try {
        let query;

        //Copy req.query
        const reqQuery = {...req.query};

        //Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];

        //Loop over remove fields and delete them from reqQuery
        removeFields.forEach(param=>delete reqQuery[param]);
        // console.log(reqQuery);
        
        //Create query string
        let queryStr = JSON.stringify(req.query);

        //Create operator ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in) \b/g, match=>`$${match}`);

        //finding resource
        query = Payment.find(JSON.parse(queryStr));

        //Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        //Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join('');
            query = query.sort(sortBy);
        } else {
            query = query.sort('name');
        }

        //Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Payment.countDocuments(JSON.parse(queryStr));

        query = query.skip(startIndex).limit(limit);
        
        //Executing query
        const payment = await query;

        //Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        res.status(200).json({
            success: true, 
            count: payment.length,
            pagination,
            data: payment
        });
    } catch(err) {
        res.status(400).json({success: false, message: err.message});
    }
};

//@desc     Get single payment by payment_intent
//@route    GET /api/v1/payments/:payment_intent
//@access   Public
exports.getPayment = async (req, res, next) => {
    try {
        const payment = await Payment.findOne(req.params.payment_intent);
        
        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        res.status(200).json({
            success: true, 
            data: payment
        });
    } catch(err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

//@desc     Update single car
//@route    PUT /api/v1/payments/:id
//@access   Private
exports.updatePayment = async (req, res, next) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!payment) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: payment});

    } catch(err) {
        console.log(err);
        res.status(400).json({success: false});
    }
};
