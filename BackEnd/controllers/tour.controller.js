const { Tour } = require('../models');

exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.findAll();
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getToursById = async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTour = async (req, res) => {
  try {
    const {
      image,
      sale_off,
      place,
      title,
      cost,
      region,
      description,
      rating,
      reviews_count,
      arrive_day,
      depart_day,
      type,
      group_size,
      language,
    } = req.body;
    const tour = await Tour.create(
      {
        image,
        sale_off,
        place,
        title,
        cost,
        region,
        description,
        rating,
        reviews_count,
        arrive_day,
        depart_day,
        type,
        group_size,
        language,
      }
    );
    res.status(201).json({ message: 'Tour added successfully', id: tour.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const [updated] = await Tour.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.status(200).json({ message: 'Tour updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const deleted = await Tour.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};