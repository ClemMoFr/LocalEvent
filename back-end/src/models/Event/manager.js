const { getEventRepository } = require("../../database/utils");

async function initializeEvent() {
  const EventRepository = await getEventRepository();
  await EventRepository.clear();
  const events = [
    {
      eventTitle: "Foire du trône",
      eventTicketingTitle: "https://www.google.com/",
      eventDate: "Du 6 juillet au 21 juillet",
      eventImage: "test",
      eventDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in euismod turpis. Sed erat mauris, efficitur sit amet sem ac, dictum imperdiet magna. Integer dignissim suscipit ligula, a blandit purus finibus et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque luctus semper nibh, placerat fermentum eros condimentum a. Cras pretium, metus eu blandit ultrices, lectus urna sodales nibh, at luctus neque lorem at erat. Donec erat ligula, tempor id tortor sit amet, venenatis porta urna.",
      eventAddress: "11 rue saint hippolyte, Lyon",
      eventType: "Loisir",
      eventLat: 45.74680709838867,
      eventLon: 4.863496780395508,
      isFavorite: false,
    },
    {
      eventTitle: "Autre événement",
      eventTicketingTitle: "https://www.example.com/",
      eventDate: "Du 1 août au 15 août",
      eventImage: "test2",
      eventDescription:
        "Description de l'autre événement Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      eventAddress: "22 rue de l'exemple, Lyon",
      eventType: "Culture",
      eventLat: 45.76256463445394,
      eventLon: 4.827733584688283,
      isFavorite: false,
    },
  ];
  await EventRepository.save(events);
}

async function getEvent() {
  const EventRepository = await getEventRepository();
  return EventRepository.find();
}

async function getEventById(id) {
  const EventRepository = await getEventRepository();
  return EventRepository.findOne({ where: { id } });
}

async function createEvent(
  eventTitle,
  eventDate,
  eventTicketingTitle,
  eventImage,
  eventDescription,
  eventAddress,
  eventType,
  eventLat,
  eventLon,
  isFavorite
) {
  const EventRepository = await getEventRepository();
  const newEvent = EventRepository.create({
    eventTitle,
    eventDate,
    eventTicketingTitle,
    eventImage,
    eventDescription,
    eventAddress,
    eventType,
    eventLat,
    eventLon,
    isFavorite,
  });
  await EventRepository.save(newEvent);
  return newEvent;
}

async function updateEvent(
  id,
  eventTitle,
  eventDate,
  eventTicketingTitle,
  eventImage,
  eventDescription,
  eventAddress,
  eventType,
  eventLat,
  eventLon,
  isFavorite
) {
  const EventRepository = await getEventRepository();
  const existingEvent = await EventRepository.findOneBy({ id });
  if (!existingEvent) {
    throw Error("Il n'existe pas d'utilisateur correspondant à cet id");
  }
  return EventRepository.save({
    id,
    eventTitle,
    eventDate,
    eventTicketingTitle,
    eventImage,
    eventDescription,
    eventAddress,
    eventType,
    eventLat,
    eventLon,
    isFavorite,
  });
}

async function deleteEvent(id) {
  const EventRepository = await getEventRepository();
  const existingEvent = await EventRepository.findOneBy(id);
  return EventRepository.remove(existingEvent);
}

// CRUD user to event

async function addEventToUser(userId, eventData) {
  const EventRepository = await getEventRepository();
  const Event = EventRepository.create({
    ...eventData,
    user: { id: userId },
  });
  await EventRepository.save(Event);
  return Event;
}

async function readEventByUserId(userId) {
  const EventRepository = await getEventRepository();
  return EventRepository.createQueryBuilder("events")
    .innerJoin("events.user", "user")
    .where("user.id = :id", { id: userId })
    .getMany();
}

async function updateEventById(userId, updatedData) {
  const EventRepository = await getEventRepository();
  const existingEvent = await EventRepository.findOne({
    where: { id: userId },
  });
  if (!existingEvent) {
    throw Error("L'événement correspondant à cet ID n'existe pas");
  }

  await EventRepository.createQueryBuilder()
    .update()
    .set(updatedData)
    .where("id = :id", { id: userId })
    .execute();

  const updatedEvent = await EventRepository.findOne({
    where: { id: userId },
  });
  return updatedEvent;
}

async function deleteEventById(eventId) {
  const EventRepository = await getEventRepository();
  const existingEvent = await EventRepository.findOne({
    where: { id: eventId },
  });
  if (!existingEvent) {
    throw Error("L'événement correspondant à cet ID n'existe pas");
  }
  await EventRepository.remove(existingEvent);
}

async function deleteEventByUserId(userId) {
  const EventRepository = await getEventRepository();
  const Events = await EventRepository.find({
    where: { user: { id: userId } },
  });

  if (Events.length === 0) {
    throw Error("Aucun événement pour cet utilisateur.");
  }

  await EventRepository.remove(Events);
}

module.exports = {
  initializeEvent,
  getEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  addEventToUser,
  readEventByUserId,
  updateEventById,
  deleteEventById,
  deleteEventByUserId,
};
