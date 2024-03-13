const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('../data/dbConfig');

// Find user by ID
exports.findById = async id => db.select().from('users').where('id', id);
// Find user notifications
exports.findByUserNotify = async id =>
  db.select().from('notifications').where('userId', id);

// Find a single user by filter
exports.findOne = async ({ condition, field }) => {
  return db.select().from('users as u').where(condition, field).first();
};

// Create a new student
exports.create = async studentData => {
  let userId;

  await db.transaction(async trx => {
    const [role] = await trx('roles').where('name', 'student');
    const roleIdToUse = role ? role.id : 3; // Default to a regular user role if 'student' role not found

    const hash = await bcrypt.hashSync(studentData.password, 12);

    const [createdUserId] = await trx('users').insert({
      firstname: studentData.firstname,
      lastname: studentData.lastname,
      password: hash,
      email: studentData.email,
      phone: studentData.phone,
      imageUrl: studentData.imageUrl,
      address: studentData.address,
      roleId: roleIdToUse,
    });

    userId = createdUserId;

    await trx('students').insert({
      userId,
      faculty: studentData.faculty,
      YearOfStudy: studentData.yearOfStudy,
    });
  });

  return this.findById(userId);
};

// Update user by ID and return the updated user
exports.findByIdandUpdate = async (id, changes) => {
  return db('users').where('id', id).update(changes).returning('*');
};

// Delete user by ID
exports.findByIdandDelete = async id => db('users').where('id', id).del();

// Check if the provided password matches the user's hashed password
exports.correctPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

// Check if the user's password was changed after a specific timestamp
exports.changePasswordAfter = (updateTime, JWTTimestamp) => {
  if (updateTime) {
    const changedTimestamp = new Date(updateTime).getTime() / 1000;
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Create a password reset token for the user
exports.createPasswordResetToken = async user => {
  const resetToken = crypto.randomBytes(32).toString('hex');

  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const changes = {
    passwordResetToken: hashedToken,
    passwordResetExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
  };

  await this.findByIdandUpdate(user.id, changes);

  return resetToken;
};
