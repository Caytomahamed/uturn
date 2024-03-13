/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cars').del();
  await knex('cars').insert([
    {
      driverId: 1, // Assuming the first driver
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'black',
      capacity: 10,
      bookedSeats: 6,
      seatsLeft: 4,
      carPlateNumber: 'ABC123',
      carType: 'noha',
      LicenseNumber: 987654,
      carImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0cePGa-LWSn1RGRyPk_FDqMdHRHCeM_cs1g&usqp=CAU',
    },
    {
      driverId: 2, // Assuming the first driver
      make: 'Tesla',
      model: 'Camry',
      year: 2022,
      color: 'White',
      capacity: 10,
      bookedSeats: 4,
      seatsLeft: 6,
      carType: 'vitz',
      carPlateNumber: 'ABC123',
      LicenseNumber: 987654,
      carImg:
        'https://global.toyota/pages/news/images/2022/01/13/1330/20220113_01_t_w610.gif',
    },
    {
      driverId: 3, // Assuming the first driver
      make: 'Nisan',
      model: 'Camry',
      year: 2022,
      color: 'black',
      capacity: 6,
      bookedSeats: 3,
      seatsLeft: 3,
      carType: 'probox',
      carPlateNumber: 'ABC123',
      LicenseNumber: 987654,
      carImg: 'https://www.1999.co.jp/itbig64/10649177.jpg',
    },
    {
      driverId: 4, // Assuming the first driver
      make: 'Nisan',
      model: 'Camry',
      year: 2022,
      color: 'white',
      capacity: 6,
      bookedSeats: 4,
      seatsLeft: 2,
      carType: 'probox',
      carPlateNumber: 'ABC123',
      LicenseNumber: 987654,
      carImg:
        'https://karaadso.com/public/uploads/car_listing_featured_photos/4da4b2646110c23c63f8afd638c80423.jpg',
    },
    {
      driverId: 5, // Assuming the first driver
      make: 'Nisan',
      model: 'Camry',
      year: 2022,
      color: 'black',
      capacity: 4,
      bookedSeats: 3,
      seatsLeft: 1,
      carType: 'vitz',
      carPlateNumber: 'ABC123',
      LicenseNumber: 987654,
      carImg:
        'https://global.toyota/pages/news/images/2017/01/12/1330/vit1701_16_s.jpg',
    },
    {
      driverId: 6, // Assuming the first driver
      make: 'Nisan',
      model: 'Camry',
      year: 2022,
      color: 'blue',
      capacity: 4,
      bookedSeats: 2,
      seatsLeft: 2,
      carType: 'probox',
      carPlateNumber: 'ABC123',
      LicenseNumber: 987654,
      carImg:
        'https://cache1.pakwheels.com/system/car_generation_pictures/6344/original/Toyota_Vitz_Front_Right_Angled.jpg?1647929753',
    },
    {
      driverId: 7, // Assuming the first driver
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'black',
      capacity: 10,
      bookedSeats: 6,
      seatsLeft: 4,
      carPlateNumber: 'ABC123',
      carType: 'noha',
      LicenseNumber: 987654,
      carImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0cePGa-LWSn1RGRyPk_FDqMdHRHCeM_cs1g&usqp=CAU',
    },
    {
      driverId: 8, // Assuming the first driver
      make: 'Tesla',
      model: 'Camry',
      year: 2022,
      color: 'White',
      capacity: 10,
      bookedSeats: 4,
      seatsLeft: 6,
      carType: 'vitz',
      carPlateNumber: 'ABC123',
      LicenseNumber: 987654,
      carImg:
        'https://global.toyota/pages/news/images/2022/01/13/1330/20220113_01_t_w610.gif',
    },
    {
      driverId: 9, // Assuming the first driver
      make: 'Nisan',
      model: 'Camry',
      year: 2022,
      color: 'black',
      capacity: 6,
      bookedSeats: 3,
      seatsLeft: 3,
      carType: 'probox',
      carPlateNumber: 'ABC123',
      LicenseNumber: 987654,
      carImg: 'https://www.1999.co.jp/itbig64/10649177.jpg',
    },
    {
      driverId: 10, // Assuming the first driver
      make: 'Nisan',
      model: 'Camry',
      year: 2022,
      color: 'white',
      capacity: 6,
      bookedSeats: 4,
      seatsLeft: 2,
      carType: 'probox',
      carPlateNumber: 'ABC123',
      LicenseNumber: 987654,
      carImg:
        'https://karaadso.com/public/uploads/car_listing_featured_photos/4da4b2646110c23c63f8afd638c80423.jpg',
    },
    {
      driverId: 11, // Assuming the first driver
      make: 'Nisan',
      model: 'Camry',
      year: 2022,
      color: 'black',
      capacity: 4,
      bookedSeats: 3,
      seatsLeft: 1,
      carType: 'vitz',
      carPlateNumber: 'ABC123',
      LicenseNumber: 987654,
      carImg:
        'https://global.toyota/pages/news/images/2017/01/12/1330/vit1701_16_s.jpg',
    },
    {
      driverId: 12, // Assuming the first driver
      make: 'Nisan',
      model: 'Camry',
      year: 2022,
      color: 'blue',
      capacity: 4,
      bookedSeats: 2,
      seatsLeft: 2,
      carType: 'probox',
      carPlateNumber: 'ABC123',
      LicenseNumber: 987654,
      carImg:
        'https://cache1.pakwheels.com/system/car_generation_pictures/6344/original/Toyota_Vitz_Front_Right_Angled.jpg?1647929753',
    },
  ]);
};
