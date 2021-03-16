'use strict'
const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = (sequelize) => {
  class Book extends Model {}

  Book.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'A book title is required'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'A book author is required'
        }
      }
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  }, { sequelize })
  return Book
}
