/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('schedules').del();
  await knex('schedules').insert([
    {
      routeId: 1, // Assuming the first route
      driverId: 1, // Assuming the first driver
    },
    {
      routeId: 1, // Assuming the first route
      driverId: 2, // Assuming the first driver
    },
    {
      routeId: 1, // Assuming the first route
      driverId: 3, // Assuming the first driver
    },
    {
      routeId: 1, // Assuming the first route
      driverId: 4, // Assuming the first driver
    },
    {
      routeId: 1, // Assuming the first route
      driverId: 5, // Assuming the first driver
    },
    {
      routeId: 1, // Assuming the first route
      driverId: 6, // Assuming the first driver
    },

    // ina mooge
    {
      routeId: 2, // Assuming the first route
      driverId: 7, // Assuming the first driver
    },
    {
      routeId: 2, // Assuming the first route
      driverId: 8, // Assuming the first driver
    },
    {
      routeId: 2, // Assuming the first route
      driverId: 9, // Assuming the first driver
    },
    {
      routeId: 2, // Assuming the first route
      driverId: 10, // Assuming the first driver
    },
    {
      routeId: 2, // Assuming the first route
      driverId: 11, // Assuming the first driver
    },
    {
      routeId: 2, // Assuming the first route
      driverId: 12, // Assuming the first driver
    },
  ]);
};
