const db = require('../data/dbConfig');

// Find all schedules with user details
exports.find = async () => {
  return (
    db('schedules as s')
      .select(
        's.id as scheduleId',
        's.driverId',
        's.routeId',
        'price',
        'start',
        'finish',
        'r.description',
        'address as driverAddress',
        'carType',
        'model',
        'year',
        'carImg',
        'color',
        'bookedSeats',
        'seatsLeft',
        'capacity',
        'u.firstname as driverFirstName',
        'u.lastname as driverLastName',
        'u.email as driverEmail',
        'u.phone as driverPhone',
        's.createdAt as scheduleCreatedAt',
        's.updatedAt as scheduleUpdatedAt',
      )
      .join('drivers as d', 's.driverId', 'd.id')
      .join('cars as c', 'd.id', 'c.driverId')
      // .join('status as st', 'd.statusId', 'st.id')
      .join('routes as r', 's.routeId', 'r.id')
      .join('users as u', 'd.userId', 'u.id')
  );
};

// find by Id
exports.findById = async id => {
  return db('schedules as s')
    .select(
      's.id as scheduleId',
      's.driverId',
      'r.price',
      'r.start',
      'r.finish',
      'r.description',
      'address as driverAddress',
      'carType',
      'model',
      'year',
      'color',
      'carImg',
      'bookedSeats',
      'u.firstname as driverFirstName',
      'u.lastname as driverLastName',
      'u.email as driverEmail',
      'u.phone as driverPhone',
      's.createdAt as scheduleCreatedAt',
      's.updatedAt as scheduleUpdatedAt',
    )
    .join('drivers as d', 's.driverId', 'd.id')
    .join('cars as c', 'd.id', 'c.driverId')
    .join('routes as r', 's.routeId', 'r.id')
    .join('users as u', 'd.userId', 'u.id')
    .where('s.id', id);
};

exports.create = async schedule => {
  const [id] = await db('schedules').insert(schedule);
  return this.findById(id);
};

// update schedule
exports.findByIdandUpdate = async (id, changes) => {
  await db('schedules').update(changes).where('id', id);
  return this.findById(id);
};

// delete schedule
exports.findByIdandDelete = async id => db('schedules').where('id', id).del();

//searching
exports.searching = async search => {
  const { start } = search;
  let query = db('schedules as s')
    .select(
      's.id as scheduleId',
      's.driverId',
      'r.price',
      'r.start',
      'r.finish',
      'r.description',
      'address as driverAddress',
      'bookedSeats',
      'seatsLeft',
      'capacity',
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
    )
    .join('drivers as d', 's.driverId', 'd.id')
    .join('cars as c', 'd.id', 'c.driverId')
    // .join('status as st', 'd.statusId', 'st.id')
    .join('routes as r', 's.routeId', 'r.id')
    .join('users as u', 'd.userId', 'u.id');

  console.log('🔍', start);

  query = query
    .where('start', 'LIKE', `%${start}%`)
    .orWhere('description', 'LIKE', `%${start}%`)
    // .andWhereNot('st.statusName', '=', 'Recovery')
    .orderBy(db.raw('bookedSeats / capacity'), 'asc');

  let orderByAverage = await query;
  orderByAverage = orderByAverage.map(schedule => {
    const { bookedSeats, capacity } = schedule;
    const av = bookedSeats / capacity;
    schedule['average'] = av;
    return schedule;
  });
  orderByAverage.sort((a, b) => a.average - b.average);

  return orderByAverage;
};

exports.findByUserAddress = async address => {
  console.log(address);
  let query = db('schedules as s')
    .select(
      's.id as scheduleId',
      's.driverId',
      'r.price',
      'r.start',
      'r.finish',
      'r.description',
      'address as driverAddress',
      'bookedSeats',
      'seatsLeft',
      'capacity',
      'carType',
      'model',
      'year',
      'carImg',
      'bookedSeats',
      'u.firstname as driverFirstName',
      'u.lastname as driverLastName',
      'u.email as driverEmail',
      'u.phone as driverPhone',
      's.createdAt as scheduleCreatedAt',
      's.updatedAt as scheduleUpdatedAt',
    )
    .join('drivers as d', 's.driverId', 'd.id')
    .join('cars as c', 'd.id', 'c.driverId')
    // .join('status as st', 'd.statusId', 'st.id')
    .join('routes as r', 's.routeId', 'r.id')
    .join('users as u', 'd.userId', 'u.id');

  query = query
    .where('start', 'LIKE', `%${address}%`)
    .orWhere('description', 'LIKE', `%${address}%`)
    // .andWhereNot('st.statusName', '=', 'Recovery')
    .orderBy(db.raw('bookedSeats / capacity'), 'asc')
    .limit(4);

  let orderByAverage = await query;
  orderByAverage = orderByAverage.map(schedule => {
    const { bookedSeats, capacity } = schedule;
    const av = bookedSeats / capacity;
    schedule['average'] = av;
    return schedule;
  });
  orderByAverage.sort((a, b) => a.average - b.average);

  return orderByAverage;
};

exports.findRecovery = async () => {
  return await db('schedules as s')
    .select(
      's.id as scheduleId',
      's.driverId',
      'state',
      'r.price',
      'r.start',
      'r.finish',
      'r.description',
      'address as driverAddress',
      'statusName as status',
      'bookedSeats',
      'seatsLeft',
      'capacity',
      'carType',
      'model',
      'year',
      'carImg',
      'bookedSeats',
      'u.firstname as driverFirstName',
      'u.lastname as driverLastName',
      'u.email as driverEmail',
      'u.phone as driverPhone',
      's.createdAt as scheduleCreatedAt',
      's.updatedAt as scheduleUpdatedAt',
    )
    .join('drivers as d', 's.driverId', 'd.id')
    .join('cars as c', 'd.id', 'c.driverId')
    .join('status as st', 'd.statusId', 'st.id')
    .join('routes as r', 's.routeId', 'r.id')
    .join('users as u', 'd.userId', 'u.id')
    .where('state', '=', 'recovery')
    .where('st.statusName', '=', 'null');
};
