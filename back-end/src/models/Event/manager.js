const { getEventRepository } = require("../../database/utils");

async function initializeEvent() {
  const EventRepository = await getEventRepository();
  await EventRepository.clear();
  await EventRepository.save({
    eventTitle: "Foire du trône",
    eventTicketingTitle: "https://www.google.com/",
    eventImage: "test",
    eventDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in euismod turpis. Sed erat mauris, efficitur sit amet sem ac, dictum imperdiet magna. Integer dignissim suscipit ligula, a blandit purus finibus et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque luctus semper nibh, placerat fermentum eros condimentum a. Cras pretium, metus eu blandit ultrices, lectus urna sodales nibh, at luctus neque lorem at erat. Donec erat ligula, tempor id tortor sit amet, venenatis porta urna.",
    eventAdress: "11 rue saint hippolyte, Lyon",
    eventType: "Loisir",
  });
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
  eventTicketingTitle,
  eventImage,
  eventDescription,
  eventAdress,
  eventType
) {
  const EventRepository = await getEventRepository();
  const newEvent = EventRepository.create({
    eventTitle,
    eventTicketingTitle,
    eventImage,
    eventDescription,
    eventAdress,
    eventType,
  });
  await EventRepository.save(newEvent);
  return newEvent;
}

async function updateEvent(
  id,
  eventTitle,
  eventTicketingTitle,
  eventImage,
  eventDescription,
  eventAdress,
  eventType
) {
  const EventRepository = await getEventRepository();
  const existingEvent = await EventRepository.findOneBy({ id });
  if (!existingEvent) {
    throw Error("Il n'existe pas d'utilisateur correspondant à cet id");
  }
  return EventRepository.save({
    id,
    eventTitle,
    eventTicketingTitle,
    eventImage,
    eventDescription,
    eventAdress,
    eventType,
  });
}

async function deleteEvent(id) {
  const EventRepository = await getEventRepository();
  const existingEvent = await EventRepository.findOneBy(id);
  return EventRepository.remove(existingEvent);
}

module.exports = {
  initializeEvent,
  getEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
