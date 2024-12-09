const { Billing, User } = require('../models'); // Import models

exports.createBilling = async (req, res) => {
    try {
        const { name, email, phone, address, paymentMethod, totalCost, tourTitle, tourPlace, arrivalDate, departureDate, children, adults } = req.body;
        const userId = req.user.id; // Get user ID from token (checkAuth middleware)

        // Create billing record
        const billing = await Billing.create({
            userId,
            name,
            email,
            phone,
            address,
            paymentMethod,
            totalCost,
            tourTitle,
            tourPlace,
            arrivalDate,
            departureDate,
            children,
            adults,
        });

        res.status(201).json({
            message: 'Billing created successfully',
            billing,
        });
    } catch (error) {
        console.error('Error creating billing:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getAllBillings = async (req, res) => {
    try {
        const billings = await Billing.findAll({
            
            include: {
                model: User,
                attributes: ['id', 'email'],
            },
        });

        res.status(200).json({ billings });
    } catch (error) {
        console.error('Error getting billings:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getBillingByUser = async (req, res) => {
    try {
        // Get userId from the authenticated user (from the checkAuth middleware)
        const userId = req.user.id;

        // Fetch only the billings associated with the logged-in user
        const billings = await Billing.findAll({
            where: {
                userId, // Filter by userId
            },
            include: {
                model: User,
                attributes: ['id', 'email'],
            },
        });

        if (!billings.length) {
            return res.status(404).json({ message: 'No billings found for this user.' });
        }

        res.status(200).json({ billings });
    } catch (error) {
        console.error('Error getting billings:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

