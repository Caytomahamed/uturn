/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('students').del(); 
  await knex('students').insert([
    { userId: 1, faculty: 'Computing & IT', yearOfStudy: 1 },
    { userId: 3, faculty: 'Computing & IT', yearOfStudy: 1 },
    { userId: 5, faculty: 'Computing & IT', yearOfStudy: 1 },
    { userId: 7, faculty: 'Computing & IT', yearOfStudy: 1 },
    { userId: 8, faculty: 'Computing & IT', yearOfStudy: 1 },
    { userId: 10, faculty: 'Computing & IT', yearOfStudy: 1 },
  ]);
};
