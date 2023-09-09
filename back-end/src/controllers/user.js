const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyPassword,
  getUserByEmail,
} = require("../models/User/manager");

const {
  addEventToUser,
  readEventByUserId,
  updateEventById,
  deleteEventById,
  deleteEventByUserId,
} = require("../models/Event/manager");

const jwt = require("jsonwebtoken");

const get = async (req, res) => {
  const user = await getUser();
  res.json(user);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  res.json(user);
};

const post = async (req, res) => {
  const { userName, userEmail, userPassword, userRole } = req.body;
  if (!userName) {
    res.status(400).json({ error: "Le nom de l'utilisateur est manquant" });
  } else if (!userEmail) {
    res.status(400).json({ error: "L'email de l'utilisateur est manquant" });
  } else if (!userPassword) {
    res.status(400).json({ error: "Le mot de passe" });
  } else if (!userRole) {
    res.status(400).json({ error: "Le role" });
  } else {
    const newUser = await createUser(
      userName,
      userEmail,
      userPassword,
      userRole
    );
    res.status(201).json(newUser);
  }
};

const put = async (req, res) => {
  const { id } = req.params;
  const { userName, userEmail, userPassword, userRole } = req.body;
  {
    try {
      const updatedUser = await updateUser(
        id,
        userName,
        userEmail,
        userPassword,

        userRole
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
};

const del = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser({ id });
    res.json({ message: `l'événement ${id} à bien été supprimée.` });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// CRUD entre l'utilisateur et l'événement

const addEventToUserController = async (req, res) => {
  const { id } = req.params;
  const { eventData } = req.body;
  try {
    const events = await addEventToUser(id, eventData);
    res.status(201).json(events);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const readEventFromUser = async (req, res) => {
  const { id } = req.params;
  try {
    const events = await readEventByUserId(id);
    res.json(events);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateEventFromUser = async (req, res) => {
  const { id } = req.params;
  console.log("ceci est le console log de l'id" + id);
  const updatedData = req.body;
  try {
    const updatedReglements = await updateEventById(id, updatedData);
    console.log(updatedData);
    res.json(updatedReglements);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteEventFromUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteEventById(id);
    res.json({ message: `L'event'${id} a bien été supprimée.` });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteEventFromUserAll = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteEventByUserId(id);
    res.json({
      message: `Tous les events de ${id} ont été supprimées.`,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const user = await getUserByEmail(userEmail);

  console.log(user);

  if (!user) {
    return res.status(401).json({ error: "Utilisateur non trouvé" });
  }

  const passwordMatch = await verifyPassword(user, userPassword);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Mot de passe incorrect" });
  }

  const token = jwt.sign({ userId: user.id }, "abc", {
    expiresIn: "72h",
  });

  // Vérifiez si l'utilisateur a des événements associés
  const userEvents = await readEventByUserId(user.id);

  res.status(200).json({ token, userEvents });
};

module.exports = {
  get,
  getById,
  post,
  put,
  del,
  addEventToUserController,
  readEventFromUser,
  updateEventFromUser,
  deleteEventFromUser,
  loginUser,
};
