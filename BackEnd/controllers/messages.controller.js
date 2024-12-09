const { Message } = require('../models');

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get messages.' });
    }
}

exports.createMessage = async (req, res) => {
    const { name, email, comment } = req.body;

    if (!name || !email || !comment) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        await Message.create({ name, email, comment });
        res.status(201).json({ message: 'Message submitted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save message.' });
    }
};