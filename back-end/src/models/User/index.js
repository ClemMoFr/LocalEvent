const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    userName: {
      type: "text",
    },
    userEmail: {
      type: "text",
    },
    userPassword: {
      type: "text",
    },
    userRole: {
      type: "text",
    },
  },
  relations: {
    events: {
      target: "Event",
      type: "one-to-many",
      inverseSide: "user",
      cascade: true,
    },
  },
});
