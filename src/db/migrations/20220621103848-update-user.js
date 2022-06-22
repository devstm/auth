'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Users', ['username', 'deletedAt'], {
      type: 'unique',
      name: 'unique_username_deletedAt',
    });
  },
};
