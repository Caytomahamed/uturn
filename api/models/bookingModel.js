const db = require('../data/dbConfig');
const { findByDriverId, findByIdandUpdate } = require('./carModel');

// find all booking
exports.find = async () => await db.select().from('booking');

// find booking by id
exports.findById = async id =>
  await db.select().from('booking').where('id', id);

exports.findByUserId = async id => await db('booking').where('userId', id);

exports.findBookingsByUserId = async id => {
  return db('schedules as s')
    .select(
      'b.userId',
      'b.id as bookingId',
      's.id as scheduleId',
      's.driverId',
      'price',
      'start',
      'finish',
      'r.description',
      'address as driverAddress',
      'carType',
      'model',
      'make',
      'color',
      'year',
      'carImg',
      'bookedSeats',
      'u.firstname as driverFirstName',
      'u.lastname as driverLastName',
      'u.email as driverEmail',
      'u.phone as driverPhone',
      's.createdAt as scheduleCreatedAt',
      's.updatedAt as scheduleUpdatedAt',
      'pickuplocation',
      'offToday',
    )
    .join('booking as b', 's.id', 'b.scheduleId')
    .join('routes as r', 's.routeId', 'r.id')
    .join('drivers as d', 's.driverId', 'd.id')
    .join('users as u', 'd.userId', 'u.id')
    .join('cars as c', 'd.id', 'c.driverId')
    .where('b.userId', id);
};

// create booking
exports.create = async data => {
  let bookingId;
  await db.transaction(async trx => {
    // Insert booking table
    const [id] = await trx('booking').insert(data);

    bookingId = id;

    // Find booking by Id
    const [book] = await trx('booking').where('id', id);

    // Find by car into driverId
    const [car] = await trx('cars').where('driverId', book.driverId);

    // get update parts
    let { bookedSeats, seatsLeft, capacity } = car;
    bookedSeats++;
    seatsLeft--;

    if (bookedSeats > capacity) bookedSeats = capacity;
    if (seatsLeft <= 0) seatsLeft = 0;

    const changes = { bookedSeats, seatsLeft };

    // update now
    await trx('cars').where('id', car.id).update(changes);

    // notifications
    // Create a new Date object
    const currentDate = new Date();

    // Get the various components of the date
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Get schedule infor
    const [schedule] = await trx('schedules').where('id', book.scheduleId);
    const [route] = await trx('routes').where('id', schedule.routeId);
    await trx('notifications').insert({
      type: 'success',
      title: 'New Booking',
      message: 'You have a new booking and ready to ride!😇',
      createdAt: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      userId: data.userId,
    });
    await trx('notifications').insert({
      type: 'success',
      title: 'New Booking',
      message: 'You have a new booking and ready to ride!😇',
      createdAt: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      userId: data.driverId,
    });
  });

  return this.findById(bookingId);
};

// update booking
exports.findByIdandUpdate = async (id, changes) => {
  await db('booking').update(changes).where('id', id);
  return this.findById(id);
};

exports.findByIdandUpdateOffToday = async (userId, id, changes) => {
  await db.transaction(async trx => {
    await trx('booking')
      .update(changes)
      .where('id', id)
      .andWhere('userId', userId);

    // Find booking by Id
    const [book] = await trx('booking').where('id', id);
    // notifications
    // Create a new Date object
    const currentDate = new Date();

    // Get the various components of the date
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    await trx('notifications').insert({
      type: 'warning',
      title: 'New Booking',
      message: 'You have a new booking and ready to ride!😇',
      createdAt: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      userId: book.userId,
    });
    await trx('notifications').insert({
      type: 'warning',
      title: 'New Booking',
      message: 'You have a new booking and ready to ride!😇',
      createdAt: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      userId: book.driverId,
    });
  });
  return this.findById(id);
};

// delete booking
exports.findByIdandDelete = async id => db('booking').where('id', id).del();

// unBooking
exports.unBooking = async id => {
  await db.transaction(async trx => {
    // Find booking by Id
    const [book] = await trx('booking').where('id', id);

    // Find by car into driverId
    const [car] = await trx('cars').where('driverId', book.driverId);

    // get update parts
    let { bookedSeats, seatsLeft, capacity } = car;
    bookedSeats--;
    seatsLeft++;

    if (seatsLeft > capacity) seatsLeft = capacity;
    if (bookedSeats <= 0) bookedSeats = 0;

    const changes = { bookedSeats, seatsLeft };

    // update now
    await trx('cars').where('id', car.id).update(changes);

    // notifications
    // Create a new Date object
    const currentDate = new Date();

    // Get the various components of the date
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    await trx('notifications').insert({
      type: 'error',
      title: 'UnBooking Ride',
      message: 'You have a  unbooking succussfully😧',
      createdAt: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      userId: book.userId,
    });
    await trx('notifications').insert({
      type: 'error',
      title: 'UnBooking Ride',
      message: 'You have a  unbooking succussfully😧',
      createdAt: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      userId: book.driverId,
    });
  });

  return db('booking').where('id', id).del();
};
