/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('users', (users) => {
    users.increments();

    users
      .string('username', 128)
      .notNullable()
      .unique();
    users.string('password', 128).notNullable();
  });
};

// eslint-disable-next-line no-unused-vars
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
