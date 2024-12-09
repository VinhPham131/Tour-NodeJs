'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tour.hasMany(models.TopDestination, { foreignKey: 'tour_id', as: 'topDestinations' });
    }
  }
  Tour.init({
    image: DataTypes.STRING,
    sale_off: DataTypes.INTEGER,
    place: DataTypes.STRING,
    title: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    region: DataTypes.STRING,
    description: DataTypes.TEXT,
    rating: DataTypes.DECIMAL,
    reviews_count: DataTypes.INTEGER,
    arrive_day: DataTypes.DATE,
    depart_day: DataTypes.DATE,
    type: DataTypes.STRING,
    group_size: DataTypes.INTEGER,
    language: DataTypes.STRING,
    thumbnails: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};