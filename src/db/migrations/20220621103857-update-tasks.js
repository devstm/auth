'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'createdBy', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('Tasks', 'updatedBy', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('Tasks', 'deletedBy', {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Tasks', 'createdBy'),
      queryInterface.removeColumn('Tasks', 'updatedBy'),
      queryInterface.removeColumn('Tasks', 'deletedBy'),
    ]);
  },
};
