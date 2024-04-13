const Provider = require("../models/Provider");

//@desc Get peding providers
//@route GET /api/v1/providers/pending
//@access Private
exports.getPendingProviders = async (req, res, next) => {
    try {
        const pendingProviders = await Provider.find({ status: 'pending' });

        res.status(200).json({
            success: true,
            count: pendingProviders.length,
            data: pendingProviders
        });
    } catch (err) {
        console.error(err.stack);

        return res.status(500).json({
            success: false,
            message: 'Cannot find pending Providers'
        });
    }
};

//@desc Get approved providers
//@route GET /api/v1/providers/approved
//@access Private
exports.getApprovedProviders = async (req, res, next) => {
    try {
        const approvedProviders = await Provider.find({ status: 'approved' });

        res.status(200).json({
            success: true,
            count: approvedProviders.length,
            data: approvedProviders
        });
    } catch (err) {
        console.error(err.stack);

        return res.status(500).json({
            success: false,
            message: 'Cannot find approved Providers'
        });
    }
};

//@desc     Add Provider
//@route    POST /api/v1/provider/
//@access   Private
exports.addProvider = async (req, res, next) => {

    req.body.user = req.user.id;

    const provider = await Provider.create({...req.body});
    res.status(201).json({
        success: true,
        data: provider
    });
};

//@desc   Update single providers
//@route  PUT /api/v1/providers/:id
//@access Private
exports.updateProvider = async (req, res, next) => {
    try {
        const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!provider) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({
            success: true,
            data: provider
        });
    } catch (err) {
        res.status(400).json({success: false});
    }
}

//@desc   Delete single provide
//@route  DELETE /api/v1/providers/:id
//@access Private
exports.deleteProvider = async (req, res, next) => {
    try {
        const provider = await Provider.findById(req.params.id);

        if (!provider) {
            return res.status(400).json({success: false});
        }

        await provider.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({success: false});
    }
}

