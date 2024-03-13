exports.up = function (knex) {
  return knex.schema
    .createTable('roles', function (table) {
      table.increments('id').primary().notNullable();
      table.string('name', 50).notNullable();
    })
    .createTable('users', function (table) {
      table.increments('id').primary().notNullable();
      table.string('firstname', 255).notNullable();
      table.string('lastname', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('password', 255).notNullable();
      table.string('address', 255).notNullable();
      table.integer('phone').notNullable();
      table.string('imageUrl', 255);
      table.string('passwordResetToken');
      table.string('passwordResetExpires');
      table.integer('roleId').unsigned().notNullable();
      table
        .foreign('roleId')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.boolean('isActive').defaultTo(true).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('students', function (table) {
      table.increments('id').primary();
      table.integer('userId').unsigned();
      table
        .foreign('userId')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('faculty').notNullable();
      table.integer('yearOfStudy');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('status', function (table) {
      table.increments('id').primary();
      table.string('statusName').notNullable();
    })
    .createTable('drivers', function (table) {
      table.increments('id').primary().notNullable();
      table.integer('userId').unsigned();
      table
        .foreign('userId')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('driverType').defaultTo('normal');
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('cars', function (table) {
      table.increments('id').primary().notNullable();
      table
        .integer('driverId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('drivers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('carImg', 255).notNullable();
      table.string('carType', 255).notNullable();
      table.integer('bookedSeats', 255).defaultTo(0);
      table.integer('seatsLeft', 255).defaultTo(0);
      table.string('make', 50).notNullable();
      table.string('model', 50).notNullable();
      table.integer('year').notNullable();
      table.string('color', 50).notNullable();
      table.integer('capacity').notNullable();
      table.string('carPlateNumber').notNullable();
      table.integer('LicenseNumber').notNullable();
    })
    .createTable('routes', function (table) {
      table.increments('id').primary().notNullable();
      table.float('price').notNullable();
      table.string('start', 50).notNullable();
      table.string('finish', 50).notNullable();
      table.string('description', 255).nullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('notifications', function (table) {
      table.increments('id').primary();
      table.string('type').notNullable();
      table.integer('userId').notNullable().references('id').inTable('users');
      table.string('title').notNullable();
      table.string('message').notNullable();
      table.boolean('seen').defaultTo(false);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
    .createTable('schedules', function (table) {
      table.increments('id').primary().notNullable();
      table
        .integer('routeId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('routes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('driverId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('drivers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('recoveryDriverId').defaultTo(0);
      table.integer('recoveryExpireTime');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('booking', function (table) {
      table.increments('id').primary();
      table.string('pickuplocation').notNullable();
      table.boolean('offToday').defaultTo(false);
      table
        .integer('userId')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('scheduleId')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('schedules')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('driverId')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('drivers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('booking')
    .dropTableIfExists('schedules')
    .dropTableIfExists('routes')
    .dropTableIfExists('cars')
    .dropTableIfExists('drivers')
    .dropTableIfExists('status')
    .dropTableIfExists('notifications')
    .dropTableIfExists('students')
    .dropTableIfExists('users')
    .dropTableIfExists('roles');
};
