/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('routes').del();
  await knex('routes').insert([
    {
      price: 25.99,
      start: 'Calamadaha',
      finish: 'UOH',
      description:
        'goolada siinay,total,jiica,M.A.A,al huda,gacanta,biite,dalcada manhal,ceelgeeye,alkhaliij,sariibada calamada,start,ramad,internationalka, masalaha',
    },
    {
      price: 25.99,
      start: 'maxamed mooge',
      finish: 'UOH',
      description: 'goolada siinay,total,jiica,M.A.A,sabaxareed,qudhac dheer,sariiba qudhac dheer,goolada saylada,cali bidaar,cabdi qalaf',
    },
    {
      price: 25.99,
      start: 'Siinay',
      finish: 'AU',
      description: 'Route Description',
    },
  ]);
};
