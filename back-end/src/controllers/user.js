const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/User/manager");

const {
  addEventToUser,
  readEventByUserId,
  updateEventById,
  deleteEventById,
  deleteEventByUserId,
} = require("../models/Event/manager");

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
  const { userName, userEmail, userPassword, userConfirmPassword, userRole } =
    req.body;
  if (!userName) {
    res.status(400).json({ error: "Le nom de l'utilisateur est manquant" });
  } else if (!userEmail) {
    res.status(400).json({ error: "L'email de l'utilisateur est manquant" });
  } else if (!userPassword) {
    res.status(400).json({ error: "Le mot de passe" });
  } else if (!userConfirmPassword) {
    res
      .status(400)
      .json({ error: "La confirmation de mot de passe est manquante" });
  } else if (!userRole) {
    res.status(400).json({ error: "Le role" });
  } else {
    const newUser = await createUser(
      userName,
      userEmail,
      userPassword,
      userConfirmPassword,
      userRole
    );
    res.status(201).json(newUser);
  }
};

const put = async (req, res) => {
  const { id } = req.params;
  const { userName, userEmail, userPassword, userConfirmPassword, userRole } =
    req.body;
  {
    try {
      const updatedUser = await updateUser(
        id,
        userName,
        userEmail,
        userPassword,
        userConfirmPassword,
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
};