// faq.controller.js
const {Faq} = require('../models');

// Get all FAQs
exports.getAllFaq = async (req, res) => {
    try {
        const faqs = await Faq.findAll();
        res.status(200).json(faqs);
    } catch (error) {
        console.error('Error fetching FAQs:', error); // Log the error
        res.status(500).json({ error: 'Failed to fetch FAQs' });
    }
};

// Add a new FAQ
exports.addFaq = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newFaq = await Faq.create({ title, description });
        res.status(201).json({ message: 'FAQ added', id: newFaq.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add FAQ' });
    }
};

// Update an FAQ
exports.updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const [updated] = await Faq.update({ title, description }, { where: { id } });

        if (updated) {
            res.status(200).json({ message: 'FAQ updated' });
        } else {
            res.status(404).json({ error: 'FAQ not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update FAQ' });
    }
};

// Delete an FAQ
exports.deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Faq.destroy({ where: { id } });

        if (deleted) {
            res.status(200).json({ message: 'FAQ deleted' });
        } else {
            res.status(404).json({ error: 'FAQ not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete FAQ' });
    }
};
