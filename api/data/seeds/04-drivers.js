/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('drivers').del();
  await knex('drivers').insert([
    {
      userId: 2, // Assuming the second user is a driver
    },
    {
      userId: 4, // Assuming the second user is a driver
    },
    {
      userId: 6, // Assuming the second user is a driver
      driverType: 'recovery',
    },
    {
      userId: 11, // Assuming the second user is a driver
    },
    {
      userId: 12, // Assuming the second user is a driver
    },
    {
      userId: 13, // Assuming the second user is a driver
    },
    {
      userId: 14, // Assuming the second user is a driver
    },
    {
      userId: 15, // Assuming the second user is a driver
    },
    {
      userId: 16, // Assuming the second user is a driver
    },
    {
      userId: 17, // Assuming the second user is a driver
    },
    {
      userId: 18, // Assuming the second user is a driver
    },
    {
      userId: 19, // Assuming the second user is a driver
    },
  ]);
};
