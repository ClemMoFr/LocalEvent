const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Event",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    eventTitle: {
      type: "text",
    },
    eventDate: {
      type: "text",
    },
    eventTicketingTitle: {
      type: "text",
    },
    eventImage: {
      type: "text",
    },
    eventDescription: {
      type: "text",
    },
    eventAddress: {
      type: "text",
    },
    eventType: {
      type: "text",
    },
    isFavorite: {
      type: "boolean",
    },
  },
});
