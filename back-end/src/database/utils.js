const typeorm = require("typeorm");
const Event = require("../models/Event");

const dataSource = new typeorm.DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  entities: [Event],
  logging: ["query", "error"],
});

let initialize = false;
async function getDatabase() {
  if (!initialize) {
    await dataSource.initialize();
    initialize = true;
    console.log("connected successfuly to database");
  }
  return dataSource;
}

async function getEventRepository() {
  return (await getDatabase()).getRepository(Event);
}

module.exports = {
  getDatabase,
  getEventRepository,
};
