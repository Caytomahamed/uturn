/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('booking').del();
  await knex('booking').insert([
    {
      userId: 4, // Assuming the first user
      scheduleId: 1, // Assuming the first schedule
      driverId: 1, // Assuming the first status is 'Scheduled'
      pickuplocation: 'calamadaha',
    },
    {
      userId: 5, // Assuming the first user
      scheduleId: 1, // Assuming the first schedule
      driverId: 2, // Assuming the first status is 'Scheduled'
      pickuplocation: 'calamadaha',
    },
    {
      userId: 3, // Assuming the first user
      scheduleId: 1, // Assuming the first schedule
      driverId: 2, // Assuming the first status is 'Scheduled'
      pickuplocation: 'siinay',
    },
    {
      userId: 6, // Assuming the first user
      scheduleId: 1, // Assuming the first schedule
      driverId: 2, // Assuming the first status is 'Scheduled'
      pickuplocation: 'new Hargiesa',
    },
    {
      userId: 8, // Assuming the first user
      scheduleId: 1, // Assuming the first schedule
      driverId: 2, // Assuming the first status is 'Scheduled'
      pickuplocation: 'new Hargiesa',
    },
  ]);
};
