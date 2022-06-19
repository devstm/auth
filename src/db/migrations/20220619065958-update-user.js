'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'createdBy', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('Users', 'updatedBy', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('Users', 'deletedBy', {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'createdBy'),
      queryInterface.removeColumn('Users', 'updatedBy'),
      queryInterface.removeColumn('Users', 'deletedBy'),
    ]);
  },
};
