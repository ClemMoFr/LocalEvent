const {
  getEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../models/Event/manager");

const get = async (req, res) => {
  const event = await getEvent();
  res.json(event);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const event = await getEventById(id);
  res.json(event);
};

const post = async (req, res) => {
  const {
    eventTitle,
    eventDate,
    eventTicketingTitle,
    eventImage,
    eventDescription,
    eventAddress,
    eventType,
    isFavorite,
  } = req.body;
  if (!eventTitle) {
    res.status(400).json({ error: "Le titre de l'événement est manquant" });
  } else if (!eventTicketingTitle) {
    res.status(400).json({ error: "Le lien de la billeterie est manquant" });
  } else if (!eventImage) {
    res.status(400).json({ error: "La date de l'événement est manquante" });
  } else if (!eventDate) {
    res.status(400).json({ error: "L'image de l'événement est manquante" });
  } else if (!eventDescription) {
    res
      .status(400)
      .json({ error: "La description de l'événement est manquante" });
  } else if (!eventAddress) {
    res.status(400).json({ error: "L'adresse de l'événement est manquante" });
  } else if (!eventType) {
    res.status(400).json({ error: "Le type de l'événement est manquant" });
  } else {
    const newEvent = await createEvent(
      eventTitle,
      eventDate,
      eventTicketingTitle,
      eventImage,
      eventDescription,
      eventAddress,
      eventType,
      isFavorite
    );
    res.status(201).json(newEvent);
  }
};

const put = async (req, res) => {
  const { id } = req.params;
  const {
    eventTitle,
    eventDate,
    eventTicketingTitle,
    eventImage,
    eventDescription,
    eventAddress,
    eventType,
    isFavorite,
  } = req.body;
  {
    try {
      const updatedEvent = await updateEvent(
        id,
        eventTitle,
        eventDate,
        eventTicketingTitle,
        eventImage,
        eventDescription,
        eventAddress,
        eventType,
        isFavorite
      );
      res.json(updatedEvent);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
};

const del = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteEvent({ id });
    res.json({ message: `l'événement ${id} à bien été supprimée.` });
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
};
