const { getUserRepository } = require("../../database/utils");

async function initializeUser() {
  const UserRepository = await getUserRepository();
  await UserRepository.clear();
  await UserRepository.save({
    userName: "Mickaël",
    userEmail: "md@mail.com",
    userPassword: "123",
    userConfirmPassword: "123",
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

async function createUser(
  userName,
  userEmail,
  userPassword,
  userConfirmPassword,
  userRole
) {
  const UserRepository = await getUserRepository();
  const newUser = UserRepository.create({
    userName,
    userEmail,
    userPassword,
    userConfirmPassword,
    userRole,
  });
  await UserRepository.save(newUser);
  return newUser;
}

async function updateUser(
  id,
  userName,
  userEmail,
  userPassword,
  userConfirmPassword,
  userRole
) {
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
    userConfirmPassword,
    userRole,
  });
}

async function deleteUser(id) {
  const UserRepository = await getUserRepository();
  const existingUser = await UserRepository.findOneBy(id);
  return UserRepository.remove(existingUser);
}

module.exports = {
  initializeUser,
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
