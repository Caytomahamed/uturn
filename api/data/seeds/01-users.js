/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('roles').del();
  await knex('roles').insert([
    { name: 'admin' },
    { name: 'driver' },
    { name: 'user' },
  ]);
  await knex('users').del();
  await knex('users').insert([
    {
      firstname: 'Abdullahi',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 3, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'Fatima',
      lastname: 'Ali',
      email: 'fatima@gmail.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: 'New Hargeisa',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: false,
    },
    {
      firstname: 'Ahmed',
      lastname: 'Hassan',
      email: 'ahmed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Jigjiga Yar',
      imageUrl: 'url_to_image',
      roleId: 3, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'Amina',
      lastname: 'Ibrahim',
      email: 'amina@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Siinay',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'Omar',
      lastname: 'Mohamed',
      email: 'omar@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Calamdaha',
      imageUrl: 'url_to_image',
      roleId: 3, // Assuming 'User' role
      isActive: false,
    },
    {
      firstname: 'Abdullahi',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'Fatima',
      lastname: 'Ali',
      email: 'fatima@gmail.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: 'New Hargeisa',
      imageUrl: 'url_to_image',
      roleId: 3, // Assuming 'User' role
      isActive: false,
    },
    {
      firstname: 'Ahmed',
      lastname: 'Hassan',
      email: 'ahmed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Jigjiga Yar',
      imageUrl: 'url_to_image',
      roleId: 3, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'Amina',
      lastname: 'Ibrahim',
      email: 'amina@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Siinay',
      imageUrl: 'url_to_image',
      roleId: 3, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'Omar',
      lastname: 'Mohamed',
      email: 'omar@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Calamdaha',
      imageUrl: 'url_to_image',
      roleId: 3, // Assuming 'User' role
      isActive: false,
    },

    // drivers
    {
      firstname: 'farxaan',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'Abdullahi',
      lastname: 'Ismaciil',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'xirsi',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'Cumar',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'ali',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'Abdullahi',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'Hamse',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'C/rahmaan',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
    {
      firstname: 'C/fataax',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password', // Replace with the actual hashed password
      phone: 4123567,
      address: '150',
      imageUrl: 'url_to_image',
      roleId: 2, // Assuming 'User' role
      isActive: true,
    },
  ]);
};
