const { getUserRepository } = require("../../database/utils");
const bcrypt = require("bcrypt");

async function initializeUser() {
  const UserRepository = await getUserRepository();
  await UserRepository.clear();
  await UserRepository.save({
    userName: "Mickaël",
    userEmail: "md@mail.com",
    userPassword: await bcrypt.hash("123", 10),
    userRole: "Admin",
  });
}

async function getUser() {
  const UserRepository = await getUserRepository();
  return UserRepository.find();
}

async function getUserById(id) {
  const UserRepository = await getUserRepository();
  return UserRepository.findOne({ where: { id } });
}

async function createUser(userName, userEmail, userPassword, userRole) {
  const UserRepository = await getUserRepository();
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  const newUser = UserRepository.create({
    userName,
    userEmail,
    userPassword: hashedPassword,
    userRole,
  });
  await UserRepository.save(newUser);
  return newUser;
}

async function updateUser(id, userName, userEmail, userPassword, userRole) {
  const UserRepository = await getUserRepository();
  const existingUser = await UserRepository.findOneBy({ id });
  if (!existingUser) {
    throw Error("Il n'existe pas d'utilisateur correspondant à cet id");
  }
  return UserRepository.save({
    id,
    userName,
    userEmail,
    userPassword,
    userRole,
  });
}

async function deleteUser(id) {
  const UserRepository = await getUserRepository();
  const existingUser = await UserRepository.findOneBy(id);
  return UserRepository.remove(existingUser);
}

async function verifyPassword(user, password) {
  return bcrypt.compare(password, user.userPassword);
}

async function getUserByEmail(userEmail) {
  const UserRepository = await getUserRepository();
  return UserRepository.findOne({ where: { userEmail } });
}

module.exports = {
  initializeUser,
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyPassword,
  getUserByEmail,
};
