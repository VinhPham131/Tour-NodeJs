'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TopDestination extends Model {
    static associate(models) {
      TopDestination.belongsTo(models.Tour, { foreignKey: 'tour_id', as: 'tour' });
    }
  }
  TopDestination.init(
    {
      tour_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Tours', key: 'id' },
      },
      book_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TopDestination',
      tableName: 'top_destinations',
      timestamps: false,
    }
  );
  return TopDestination;
};
