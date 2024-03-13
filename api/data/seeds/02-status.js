/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('status').del();
  await knex('status').insert([
    { statusName: 'new' }, // only sheduled
    { statusName: 'full' }, // only sheduled
    { statusName: 'Recovery' }, // only sheduled
    { statusName: 'SeatLeft' }, // only sheduled
    { statusName: 'car not available' }, // only sheduled
    { statusName: 'available' }, // only sheduled

    { statusName: 'Pending Approval' },
    { statusName: 'Accepted' },
    { statusName: 'In progress' },
    { statusName: 'Delayed' },
    { statusName: 'Completed' },
    { statusName: 'Canceled' },
  ]);
};
