const { TopDestination, Tour } = require('../models');
const { sequelize } = require('../models');

// Get all top destinations
exports.getAllTopDestinations = async (req, res) => {
  try {
    const results = await TopDestination.findAll({
      attributes: {
        include: [
          [sequelize.col('tour.image'), 'image'],
          [sequelize.col('tour.place'), 'place'],
          [sequelize.col('tour.title'), 'title'],
        ],
      },
      include: [
        {
          model: Tour,
          as: 'tour',
          attributes: [],
        },
      ],
      order: [['book_count', 'DESC']],
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top destinations' });
  }
};

// Add a new top destination
exports.addTopDestination = async (req, res) => {
  try {
    const data = req.body;
    const result = await TopDestination.create(data);
    res.status(201).json({ message: 'Top destination added', id: result.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add top destination' });
  }
};

// Update booking count
exports.updateBookCount = async (req, res) => {
  const { id } = req.params;
  const { book_count } = req.body;

  try {
    const result = await TopDestination.update(
      { book_count },
      { where: { id } }
    );

    if (result[0] === 0) {
      res.status(404).json({ error: 'Top destination not found' });
    } else {
      res.status(200).json({ message: 'Book count updated' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book count' });
  }
};

// Delete a top destination
exports.deleteTopDestination = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await TopDestination.destroy({ where: { id } });

    if (result === 0) {
      res.status(404).json({ error: 'Top destination not found' });
    } else {
      res.status(200).json({ message: 'Top destination deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete top destination' });
  }
};
