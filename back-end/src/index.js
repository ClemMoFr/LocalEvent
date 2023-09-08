const express = require("express");

const eventControllers = require("./controllers/event");
const { initializeEvent } = require("./models/Event/manager");

const userControllers = require("./controllers/user");
const { initializeUser } = require("./models/User/manager");

const axios = require("axios");
const app = express();
const PORT = 4000;

const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

const EVENT_PATH = "/event";
app.get(EVENT_PATH, eventControllers.get);
app.get(`${EVENT_PATH}/:id`, eventControllers.getById);
app.post(EVENT_PATH, eventControllers.post);
app.put(`${EVENT_PATH}/:id`, eventControllers.put);
app.delete(`${EVENT_PATH}/:id`, eventControllers.del);

const USER_PATH = "/user";
app.get(USER_PATH, userControllers.get);
app.get(`${USER_PATH}/:id`, userControllers.getById);
app.post(USER_PATH, userControllers.post);
app.put(`${USER_PATH}/:id`, userControllers.put);
app.delete(`${USER_PATH}/:id`, userControllers.del);

app.post(`${USER_PATH}/:id/`, userControllers.addEventToUserController);
app.get(`${USER_PATH}/:id${EVENT_PATH}`, userControllers.readEventFromUser);
app.put(`${USER_PATH}${EVENT_PATH}/:id`, userControllers.updateEventFromUser);
app.delete(
  `${USER_PATH}${EVENT_PATH}/:id`,
  userControllers.deleteEventFromUser
);

app.get("/get-coordinates", async (req, res) => {
  const address = req.query.address;
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          format: "json",
          q: address,
        },
      }
    );

    if (response.data.length > 0) {
      const location = response.data[0];
      res.json({ lat: location.lat, lon: location.lon });
    } else {
      res.status(404).json({ error: "Adresse introuvable" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur de serveur" });
  }
});

async function start() {
  await initializeEvent();
  await initializeUser();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 👍`);
  });
}

start();
